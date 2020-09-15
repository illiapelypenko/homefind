import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropertyList, SearchResultsHeader } from '../../components';
import { http } from '../../utils/request';
import styles from './SearchResults.module.scss';
// import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
// import Img from '../../assets/background.jpg';

import Properties from './properties'; // get properties from file

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
      // const BASE_URL = 'https://realtor.p.rapidapi.com';
      // const PROPERTIES_FOR_SALE_URL = BASE_URL + '/properties/v2/list-for-sale';
      // const PROPERTIES_FOR_RENT_URL = BASE_URL + '/properties/v2/list-for-rent';
      // const urlParams = encodeURI(
      //   `?sort=relevance&city=${city}&limit=500&offset=0&state_code=${state_code}`
      // );

      // const propertiesForSale = await http(PROPERTIES_FOR_SALE_URL, urlParams);
      // const propertiesForRent = await http(PROPERTIES_FOR_RENT_URL, urlParams);

      // await Promise.all([propertiesForSale, propertiesForRent]);

      // const properties = [
      //   ...propertiesForSale.properties,
      //   ...propertiesForRent.properties,
      // ].filter(prop => prop.thumbnail || prop.photos_count);

      // get properties from file
      const properties = Properties.filter(prop => {
        const { thumbnail, photos_count, address, building_size } = prop;

        return (
          (thumbnail || photos_count) &&
          address?.neighborhood_name &&
          building_size?.size
        );
      });

      if (properties.length === 0) {
        this.setState({
          error: 'There were no suggestions found for the given location.',
          properties: [],
        });
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

    return (
      <div className={styles.container}>
        <SearchResultsHeader
          setView={this.setView}
          view={view}
          text={`${
            offset + this.#SHOW_MORE_PROPS_VALUE < properties.length
              ? offset + this.#SHOW_MORE_PROPS_VALUE
              : properties.length
          } of ${properties.length} matches`}
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
    );
  }
}

export const SearchResults = withRouter(SearchResultsComponent);
