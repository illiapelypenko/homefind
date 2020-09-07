import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import favesBtnIcon from '../../assets/icons/star.svg';
import logoIcon from '../../assets/icons/arrow-right.svg';
import styles from './Header.module.scss';

class Header extends Component {
  static propTypes = {};

  render() {
    return (
      <header className={styles.header}>
        <h2 className={styles.logo}>
          <img src={logoIcon} className={styles.logoIcon} alt='arrow-up' />
          <span>Homefind</span>
        </h2>
        <Link to='/faves' className={styles.favesBtn}>
          <img className={styles.favesBtnIcon} src={favesBtnIcon} alt='star' />
          <span>Your faves</span>
        </Link>
      </header>
    );
  }
}

export default Header;
