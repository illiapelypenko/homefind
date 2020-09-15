import React, { Component } from 'react';
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
import { numberWithSpaces } from '../../utils/utils';
import styles from './Property.module.scss';

export default class Property extends Component {
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
          <div className={styles.highlightLineTop}>
            <span className={styles.price}>${numberWithSpaces(price)}</span>
          </div>
          <img src={thumbnail || photos[0].href} alt="thumbnail" />
          <div className={styles.highlightLineBottom}>
            <span className={styles.infoNumber}>{baths}</span>
            <span className={styles.infoNumber}>{beds}</span>
            <span className={styles.infoNumber}>{size}</span>
          </div>
        </div>
        <div className={styles.infoDetails}>
          <span>Baths</span>
          <span>Beds</span>
          <span>Area</span>
        </div>
      </li>
    );
  }
}
