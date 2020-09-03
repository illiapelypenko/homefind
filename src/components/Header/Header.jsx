import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import starIcon from '../../assets/icons/star.svg';
import ArrowRight from './ArrowRight';

class Header extends Component {
  static propTypes = {};

  render() {
    return (
      <header className={styles.header}>
        <h1 className={styles.logo}>
          <ArrowRight className={styles.arrowRight} />
          <span>Homefind</span>
        </h1>
        <Link to='/faves' className={styles.favesBtn}>
          <img className={styles.starIcon} src={starIcon} alt='star' />
          <span>Your faves</span>
        </Link>
      </header>
    );
  }
}

export default Header;
