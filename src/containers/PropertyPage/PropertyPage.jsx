import React, { Component } from 'react';
import { addSpacesTo } from '../../utils/utils';
import styles from './PropertyPage.module.scss';

export class PropertyPage extends Component {
  render() {
    const {
      thumbnail,
      photos,
      address: { city, state, neighborhood_name, line },
      baths,
      beds,
      price,
      building_size: { size },
      prop_status,
    } = this.props.location.state.property;

    return (
      <div className={styles.container}>
        <div className={styles.info}>
          <span className={styles.firstLine}>
            {city}, {line}
          </span>
          <span className={styles.secondLine}>
            <span className={styles.secondaryAddress}>
              {state}, {neighborhood_name}
            </span>
            <span className={styles.price}>${addSpacesTo(price)}</span>
          </span>
          <span className={styles.thirdLine}>
            <span className={styles.type}>{prop_status.slice(4)}</span>
            <span className={styles.details}>
              <span className={styles.detail}>Baths: {baths}</span>
              <span className={styles.detail}>Beds: {beds}</span>
              <span className={styles.detail}>Area: {size}</span>
            </span>
          </span>
          <span className={styles.description}>
            <h1>Description</h1>
            <p>
              It’s a spacious house with two bedrooms, a living room, a large
              kitchen, two bathrooms and a store room. There are breathtaking
              views of the mountains from all the windows. It has a large
              balcony, which is ideal for eating outside in the summer. The
              house has wooden floor, a Jacuzzi, cable television, and Internet.
              <br />
              <br />
              It’s a quiet, safe neighbourhood and the neighbours are very warm
              and friendly. The house is walking distance from stores and
              restaurants in the local town and a short drive from areas with
              excellent skiing and hiking. In the area around the house you can
              see amazing wildlife such a bears, wolves, deer, and mountain
              goats.
              <br />
              <br />
              It’ perfectly situated between 43rd Street and 8th Avenue, five
              minutes from Time Square and most of the theatres, and a
              fifteen-minute walk from central Park. It’s a nice
              150-square-metre apartment on the 19th floor of a new building. It
              has two bedrooms, a nice living room with a huge balcony, a
              kitchen/dining room and two bathrooms.
              <br />
              <br />
            </p>
          </span>
          <button className={styles.learnMoreBtn}>Learn more</button>
        </div>
        <img
          src={thumbnail || photos[0].href}
          alt="property"
          className={styles.photo}
        />
      </div>
    );
  }
}
