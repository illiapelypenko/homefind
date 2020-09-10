import React from 'react';
import { Search } from '../../components';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <main className={styles.container}>
      <Search />
      <div className={styles.pageContent}>
        <h1>Find Home Your Dream!</h1>
        <span>
          Use the form above to search for houses to buy. You can search by
          place-name, postcode, or click “My location”, to search in your
          current location.
        </span>
      </div>
    </main>
  );
};
