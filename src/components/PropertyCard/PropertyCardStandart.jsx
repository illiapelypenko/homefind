import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ReactComponent as StarIcon } from "../../assets/icons/starIcon.svg";
import { ReactComponent as StarIconDisabled } from "../../assets/icons/starIconDisabled.svg";
import { ReactComponent as MediumSpinner } from "../../assets/icons/mediumSpinner.svg";
import { addSpacesTo } from "../../utils/utils";
import styles from "./PropertyCardStandart.module.scss";

class PropertyCardStandart extends Component {
  render() {
    const {
      property: {
        prop_status,
        thumbnail,
        photos,
        price,
        baths,
        beds,
        building_size: { size },
        address: { city, neighborhood_name },
      },
      onPropertyClick,
      removeFav,
      addFav,
      propertyIsLoading,
      isFav,
    } = this.props;

    return (
      <li className={styles.propertyCard} onClick={onPropertyClick}>
        <div className={styles.ribbon}>
          <span>{prop_status.slice(4)}</span>
        </div>
        {isFav ? (
          <StarIcon className={styles.starIcon} onClick={removeFav} />
        ) : (
          <StarIconDisabled className={styles.starIcon} onClick={addFav} />
        )}
        <div className={styles.title}>
          <span className={styles.neighborhoodName}>{neighborhood_name}</span>
          <span className={styles.city}>{city}</span>
        </div>
        <div className={styles.picture}>
          <div className={styles.highlightLineTop}>
            <span className={styles.price}>${addSpacesTo(price)}</span>
          </div>
          <img src={thumbnail || photos[0].href} alt='thumbnail' />
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
        {propertyIsLoading && (
          <div className={styles.propertyCardLoading}>
            <MediumSpinner className={styles.spinner} />
          </div>
        )}
      </li>
    );
  }
}

export default withRouter(PropertyCardStandart);
