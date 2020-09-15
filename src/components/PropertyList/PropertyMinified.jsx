import React, { Component } from 'react';
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
import styles from './PropertyMinified.module.scss';

export default class PropertyMinified extends Component {
  numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  render() {
    const {
      prop_status,
      thumbnail,
      photos,
      price,
      baths,
      beds,
      building_size: { size },
      address: { city, neighborhood_name },
    } = this.props.property;

    return (
      <li className={styles.propertyCard}>
        <div className={styles.ribbon}>
          <span>{prop_status.slice(4)}</span>
        </div>
        <StarIcon className={styles.starIcon} />
        <div className={styles.title}>
          <span className={styles.neighborhoodName}>{neighborhood_name}</span>
          <span className={styles.city}>{city}</span>
        </div>
        <div className={styles.picture}>
          <img src={thumbnail || photos[0].href} alt="thumbnail" />
        </div>
        <div className={styles.infoText}>
          <span>Baths</span>
          <span>Beds</span>
          <span>Area</span>
        </div>
      </li>
    );
  }
}
