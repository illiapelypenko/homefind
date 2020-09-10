import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
import { ReactComponent as LogoIcon } from '../../assets/icons/arrow-right.svg';
import styles from './Header.module.scss';

export class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <h2 className={styles.logo}>
          <LogoIcon className={styles.logoIcon} />
          <span>Homefind</span>
        </h2>
        <Link to="/faves" className={styles.favesBtn}>
          <StarIcon className={styles.starIcon} />
          <span>Your faves</span>
        </Link>
      </header>
    );
  }
}
