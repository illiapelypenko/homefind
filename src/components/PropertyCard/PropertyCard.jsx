import React, { Component } from 'react';
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
import { ReactComponent as MediumSpinner } from '../../assets/icons/mediumSpinner.svg';
import { numberWithSpaces } from '../../utils/utils';
import styles from './PropertyCard.module.scss';

export default class PropertyCard extends Component {
  state = {
    propertyIsLoading: false,
  };

  handlePropertyClick = () => {
    this.setState({ propertyIsLoading: true });

    setTimeout(() => {
      this.setState({ propertyIsLoading: false });
    }, 2000);
  };

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
      <li className={styles.propertyCard} onClick={this.handlePropertyClick}>
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
        {this.state.propertyIsLoading && (
          <div className={styles.propertyCardLoading}>
            <MediumSpinner className={styles.spinner} />
          </div>
        )}
      </li>
    );
  }
}
