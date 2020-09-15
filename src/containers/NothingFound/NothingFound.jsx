import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../assets/nothingFoundBg.png';
import styles from './NothingFound.module.scss';

export function NothingFound() {
  return (
    <div className={styles.nothingFound}>
      <img src={background} alt="background" />
      <p>We are sorry! We have not found any properties.</p>
      <Link to="/">Back to search</Link>
    </div>
  );
}
