import React, { Component } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import styles from './PropertyList.module.scss';

export class PropertyList extends Component {
  state = {
    properties: this.props.properties,
  };

  componentDidMount() {
    this.checkFavorability();
  }

  componentDidUpdate() {
    if (this.props.properties.length === this.state.properties.length) return;

    this.setState(
      { properties: this.props.properties },
      this.checkFavorability
    );
  }

  checkFavorability = () => {
    const persistedData = localStorage.getItem('favs');
    let favs = [];
    if (persistedData) favs = JSON.parse(persistedData);

    const properties = this.state.properties.map(prop => {
      const isFav = !!~favs.findIndex(
        fav => fav.property_id === prop.property_id
      );
      return { ...prop, isFav };
    });

    this.setState({ properties });
  };

  render() {
    return (
      <ul
        className={`${styles.propertyList} ${
          this.props.cardSize === 'minified'
            ? styles.propertyListMinified
            : styles.propertyListStandart
        }`}
      >
        {this.state.properties.map((property, index) => (
          <PropertyCard
            property={property}
            cardSize={this.props.cardSize}
            key={index}
            checkFavorability={this.checkFavorability}
          />
        ))}
      </ul>
    );
  }
}
