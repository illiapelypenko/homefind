import React, { Component } from 'react';
import Property from './Property';
import PropertyMinified from './PropertyMinified';
import styles from './PropertyList.module.scss';

export class PropertyList extends Component {
  render() {
    return (
      <ul
        className={
          this.props.view === 'minified'
            ? styles.propertyListMinified
            : styles.propertyList
        }
      >
        {this.props.properties.map((property, i) =>
          this.props.view === 'minified' ? (
            <PropertyMinified property={property} key={i} />
          ) : (
            <Property property={property} key={i} />
          )
        )}
      </ul>
    );
  }
}
