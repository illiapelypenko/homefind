import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import styles from './SearchResults.module.scss';
// import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
// import Img from '../../assets/background.jpg';
import { http } from '../../utils/request';

class SearchResultsComponent extends Component {
  state = {
    properties: [],
  };

  componentDidMount() {
    console.log('1');
    this.getProperties();
  }

  getProperties = async () => {
    const { city, state_code } = this.props.place;

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

      const properties = propertiesForSale.concat(propertiesForRent);

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
      this.setState({ error: error.message });
    }
  };

  render() {
    return <div>Hello</div>;
  }
}

export const SearchResults = withRouter(SearchResultsComponent);
