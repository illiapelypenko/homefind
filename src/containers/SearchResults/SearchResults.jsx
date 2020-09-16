import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropertyList, SearchResultsTopPanel } from '../../components';
import { ReactComponent as SmallSpinner } from '../../assets/icons/smallSpinner.svg';
import { ReactComponent as BigSpinner } from '../../assets/icons/bigSpinner.svg';
import { http } from '../../utils/request';
import styles from './SearchResults.module.scss';

class SearchResultsComponent extends Component {
  state = {
    properties: [],
    cardSize: 'standart',
    offset: 0,
    propertiesIsLoading: false,
  };

  #SHOW_MORE_PROPS_VALUE = 20;

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);

    const city = params.get('city');
    const state_code = params.get('state_code');

    this.getProperties({ city, state_code });

    const cardSize = localStorage.getItem('cardSize');

    cardSize
      ? this.setState({ cardSize })
      : localStorage.setItem('cardSize', this.state.cardSize);
  }

  async getProperties({ city, state_code }) {
    try {
      const BASE_URL = 'https://realtor.p.rapidapi.com';
      const PROPERTIES_FOR_SALE_URL = BASE_URL + '/properties/v2/list-for-sale';
      const PROPERTIES_FOR_RENT_URL = BASE_URL + '/properties/v2/list-for-rent';
      const urlParams = encodeURI(
        `?sort=relevance&city=${city}&limit=500&offset=0&state_code=${state_code}`
      );

      const [propertiesForSale, propertiesForRent] = await Promise.all([
        http(PROPERTIES_FOR_SALE_URL, urlParams),
        http(PROPERTIES_FOR_RENT_URL, urlParams),
      ]);

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

        this.props.history.push('/nothingfound', {
          message: 'We are sorry! We have not found any properties.',
        });

        return;
      }

      this.setState({
        properties,
      });
    } catch (error) {
      console.log(error);

      this.setState({ error: error.message });

      this.props.history.push('/nothingfound', {
        message: 'We are sorry! Server is unavailable',
      });
    }
  }

  setView = cardSize => {
    this.setState({ cardSize });

    localStorage.setItem('cardSize', cardSize);
  };

  handleLoadMoreBtnClick = () => {
    const scrollY = window.scrollY;

    this.setState({ propertiesIsLoading: true });

    setTimeout(() => {
      this.setState(
        state => ({
          offset: state.offset + this.#SHOW_MORE_PROPS_VALUE,
          propertiesIsLoading: false,
        }),
        () => window.scrollTo(0, scrollY)
      );
    }, 2000);
  };

  render() {
    const { cardSize, offset, properties, propertiesIsLoading } = this.state;

    const canLoadMoreProperties =
      properties.length - offset - this.#SHOW_MORE_PROPS_VALUE > 0;

    const topPanelText = `${
      offset + this.#SHOW_MORE_PROPS_VALUE < properties.length
        ? offset + this.#SHOW_MORE_PROPS_VALUE
        : properties.length
    } of ${properties.length} matches`;

    return this.state.properties.length > 0 ? (
      <div className={styles.container}>
        <SearchResultsTopPanel
          setView={this.setView}
          cardSize={cardSize}
          text={topPanelText}
        />
        <PropertyList
          properties={properties.slice(0, offset + this.#SHOW_MORE_PROPS_VALUE)}
          cardSize={cardSize}
        />
        {canLoadMoreProperties &&
          (propertiesIsLoading ? (
            <div className={styles.loadMore}>
              <SmallSpinner className={styles.spinner} />
              <span> Loading...</span>
            </div>
          ) : (
            <button
              onClick={this.handleLoadMoreBtnClick}
              className={styles.loadMoreBtn}
            >
              Load more ...
            </button>
          ))}
      </div>
    ) : (
      <div className={styles.loading}>
        <BigSpinner className={styles.spinner} />
      </div>
    );
  }
}

export const SearchResults = withRouter(SearchResultsComponent);
