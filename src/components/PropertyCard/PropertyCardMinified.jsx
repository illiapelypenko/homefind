import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../assets/icons/starIcon.svg';
import { ReactComponent as StarIconDisabled } from '../../assets/icons/starIconDisabled.svg';
import { ReactComponent as MediumSpinner } from '../../assets/icons/mediumSpinner.svg';
import { numberWithSpaces } from '../../utils/utils';
import styles from './PropertyCardMinified.module.scss';

class PropertyCardMinified extends Component {
  state = {
    propertyIsLoading: false,
  };

  handlePropertyClick = () => {
    this.setState({ propertyIsLoading: true });

    setTimeout(() => {
      this.setState({ propertyIsLoading: false });

      this.props.history.push('/property', { property: this.props.property });
    }, 2000);
  };

  addToFavs = e => {
    e.stopPropagation();

    const persistedData = localStorage.getItem('favs');
    let favs = [];

    if (persistedData) favs = JSON.parse(persistedData);

    favs.push(this.props.property);
    localStorage.setItem('favs', JSON.stringify(favs));

    this.props.checkFavorability();
  };

  removeFromFavs = e => {
    e.stopPropagation();

    const persistedData = localStorage.getItem('favs');
    const favs = JSON.parse(persistedData);
    const removeIndex = favs.findIndex(
      fav => fav.property_id === this.props.property.property_id
    );

    favs.splice(removeIndex, 1);
    localStorage.setItem('favs', JSON.stringify(favs));

    this.props.checkFavorability();
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
      isFav,
    } = this.props.property;

    return (
      <li className={styles.propertyCard} onClick={this.handlePropertyClick}>
        <div className={styles.ribbon}>
          <span>{prop_status.slice(4)}</span>
        </div>
        {isFav ? (
          <StarIcon className={styles.starIcon} onClick={this.removeFromFavs} />
        ) : (
          <StarIconDisabled
            className={styles.starIcon}
            onClick={this.addToFavs}
          />
        )}
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
            breathtaking views of the mountains ...
          </div>
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

export default withRouter(PropertyCardMinified);
