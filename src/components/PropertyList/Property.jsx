import React, { Component } from 'react';
import styles from './PropertyList.module.scss';

export class Property extends Component {
  render() {
    return (
      <li className={styles.propertyCardBig}>
        <div className={styles.ribbon}>
          <span>Sale</span>
        </div>
        {/* <StarIcon /> */}
        <div className={styles.title}>
          <span className={styles.name}>Evegreen Ave</span>
          <span className={styles.city}>Manhatten</span>
        </div>
        <div className={styles.thumbnailWrapper}>
          <img src={''} alt="thumbnail" />
        </div>
      </li>
    );
  }
}
