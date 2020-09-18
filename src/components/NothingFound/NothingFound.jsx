import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import background from '../../assets/nothingFoundBg.png';
import styles from './NothingFound.module.scss';

function NothingFoundComponent(props) {
  return (
    <div className={styles.nothingFound}>
      <img src={background} alt="background" />
      <p>{props.location?.state?.message || 'Page not found'}</p>
      <Link to="/">Back to search</Link>
    </div>
  );
}

export const NothingFound = withRouter(NothingFoundComponent);
