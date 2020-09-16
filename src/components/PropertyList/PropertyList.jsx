import React, { Component } from 'react';
import PropertyCard from '../PropertyCard/PropertyCard';
import PropertyCardMinified from '../PropertyCard/PropertyCardMinified';
import styles from './PropertyList.module.scss';

export class PropertyList extends Component {
  render() {
    return (
      <ul
        className={
          this.props.cardSize === 'minified'
            ? styles.propertyListMinified
            : styles.propertyList
        }
      >
        {this.props.properties.map((property, i) =>
          this.props.cardSize === 'minified' ? (
            <PropertyCardMinified property={property} key={i} />
          ) : (
            <PropertyCard property={property} key={i} />
          )
        )}
      </ul>
    );
  }
}
