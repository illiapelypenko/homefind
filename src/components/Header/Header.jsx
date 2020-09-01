import React, { Component } from 'react';
import styles from './Header.module.scss';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {};

  render() {
    return (
      <header className={styles.header}>
        <h1>Homefind</h1>
      </header>
    );
  }
}

Header.propTypes = {};

export default Header;
