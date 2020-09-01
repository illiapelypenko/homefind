import React, { Component } from 'react';
import styles from './Header.module.scss';
import PropTypes from 'prop-types';

class Header extends Component {
  static propTypes = {};

  render() {
    return <div className={styles.header}>Header</div>;
  }
}

Header.propTypes = {};

export default Header;
