import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as StarIcon } from '../../assets/icons/starIcon.svg';
import { ReactComponent as LogoIcon } from '../../assets/icons/arrow-right.svg';
import styles from './Header.module.scss';

export class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <Link to="/" className={styles.logo}>
          <LogoIcon className={styles.logoIcon} />
          <span>Homefind</span>
        </Link>
        <Link to="/faves" className={styles.favesBtn}>
          <StarIcon className={styles.starIcon} />
          <span>Your faves</span>
        </Link>
      </header>
    );
  }
}
