import React, { Component } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import PropertyCardMinified from '../PropertyCard/PropertyCardMinified';
import styles from './PropertyList.module.scss';
import { connect } from 'react-redux';

class PropertyListComponent extends Component {
  render() {
    return (
      <ul
        className={
          this.props.cardSize === 'minified'
            ? styles.propertyListMinified
            : styles.propertyList
        }
      >
        {this.props.properties.map((property, i) => {
          const isFav =
            this.props.favs.find(
              fav => fav.property_id === property.property_id
            ) !== undefined;

          return this.props.cardSize === 'minified' ? (
            <PropertyCardMinified property={property} key={i} isFav={isFav} />
          ) : (
            <PropertyCard property={property} key={i} isFav={isFav} />
          );
        })}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  const { cardSize, favs } = state;
  return { cardSize, favs };
}

export const PropertyList = connect(
  mapStateToProps,
  null
)(PropertyListComponent);
