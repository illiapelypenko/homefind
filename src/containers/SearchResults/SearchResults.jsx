import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropertyList, SearchResultsHeader } from '../../components';
import { http } from '../../utils/request';
import styles from './SearchResults.module.scss';

class SearchResultsComponent extends Component {
  state = {
    properties: [],
    view: 'standart',
    offset: 0,
  };

  #SHOW_MORE_PROPS_VALUE = 20;

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);

    const city = params.get('city');
    const state_code = params.get('state_code');

    this.getProperties({ city, state_code });

    const view = localStorage.getItem('view');

    view
      ? this.setState({ view })
      : localStorage.setItem('view', this.state.view);
  }

  async getProperties({ city, state_code }) {
    try {
      const BASE_URL = 'https://realtor.p.rapidapi.com';
      const PROPERTIES_FOR_SALE_URL = BASE_URL + '/properties/v2/list-for-sale';
      const PROPERTIES_FOR_RENT_URL = BASE_URL + '/properties/v2/list-for-rent';
      const urlParams = encodeURI(
        `?sort=relevance&city=${city}&limit=500&offset=0&state_code=${state_code}`
      );

      const propertiesForSale = await http(PROPERTIES_FOR_SALE_URL, urlParams);
      const propertiesForRent = await http(PROPERTIES_FOR_RENT_URL, urlParams);

      await Promise.all([propertiesForSale, propertiesForRent]);

      const properties = [
        ...propertiesForSale.properties,
        ...propertiesForRent.properties,
      ].filter(prop => {
        const {
          thumbnail,
          photos_count,
          building_size,
          prop_status,
          price,
          baths,
          beds,
          address,
        } = prop;

        return (
          (thumbnail || photos_count) &&
          building_size?.size &&
          prop_status &&
          price &&
          baths &&
          beds &&
          address.city &&
          address.neighborhood_name
        );
      });

      if (properties.length === 0) {
        this.setState({
          error: 'There were no suggestions found for the given location.',
          properties: [],
        });

        this.props.history.push('/nothingfound');

        return;
      }

      this.setState({
        properties,
      });
    } catch (error) {
      console.log(error);

      this.setState({ error: error.message });
    }
  }

  setView = view => {
    this.setState({ view });

    localStorage.setItem('view', view);
  };

  handleLoadMoreBtnClick = () => {
    this.setState(state => ({
      offset: state.offset + this.#SHOW_MORE_PROPS_VALUE,
    }));
  };

  render() {
    const { view, offset, properties } = this.state;

    const headerText = `${
      offset + this.#SHOW_MORE_PROPS_VALUE < properties.length
        ? offset + this.#SHOW_MORE_PROPS_VALUE
        : properties.length
    } of ${properties.length} matches`;

    return this.state.properties.length > 0 ? (
      <div className={styles.container}>
        <SearchResultsHeader
          setView={this.setView}
          view={view}
          text={headerText}
        />
        <PropertyList
          properties={properties.slice(0, offset + this.#SHOW_MORE_PROPS_VALUE)}
          view={view}
        />
        {properties.length - offset - this.#SHOW_MORE_PROPS_VALUE > 0 && (
          <button
            onClick={this.handleLoadMoreBtnClick}
            className={styles.loadMoreBtn}
          >
            Load more ...
          </button>
        )}
      </div>
    ) : (
      <div className={styles.loading}>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export const SearchResults = withRouter(SearchResultsComponent);
