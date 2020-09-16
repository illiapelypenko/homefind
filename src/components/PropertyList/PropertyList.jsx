import React, { Component } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import PropertyCardMinified from '../PropertyCard/PropertyCardMinified';
import styles from './PropertyList.module.scss';

export class PropertyList extends Component {
  state = {
    properties: this.props.properties,
  };

  componentDidMount() {
    this.checkFavorability();
  }

  checkFavorability = () => {
    console.log(this.props);
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
        className={
          this.props.cardSize === 'minified'
            ? styles.propertyListMinified
            : styles.propertyList
        }
      >
        {this.state.properties.map((property, i) =>
          this.props.cardSize === 'minified' ? (
            <PropertyCardMinified
              property={property}
              key={i}
              checkFavorability={this.checkFavorability}
            />
          ) : (
            <PropertyCard
              property={property}
              key={i}
              checkFavorability={this.checkFavorability}
            />
          )
        )}
      </ul>
    );
  }
}
