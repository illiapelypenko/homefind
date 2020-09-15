import React, { Component } from 'react';
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
import { numberWithSpaces } from '../../utils/utils';
import styles from './PropertyMinified.module.scss';

export default class PropertyMinified extends Component {
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
        <div className={styles.picture}>
          <img src={thumbnail || photos[0].href} alt="thumbnail" />
        </div>
        <div className={styles.info}>
          <span className={styles.price}>${numberWithSpaces(price)}</span>
          <div className={styles.title}>
            <span className={styles.neighborhoodName}>{neighborhood_name}</span>
            ,&nbsp;
            <span className={styles.city}>{city}</span>
          </div>
          <div className={styles.infoDetails}>
            <span>{baths} baths</span>,&nbsp;<span>{beds} beds</span>,&nbsp;
            <span>{size} area</span>
          </div>
          <div className={styles.description}>
            It’s a spacious house with two bedrooms, a living room, a large
            kitchen, two light bathrooms and a store room. There are
            breathtaking views of the mountains ...{' '}
          </div>
        </div>
      </li>
    );
  }
}
