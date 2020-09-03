import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchPage.module.scss';

const LocationButton = ({ onClick }) => {
  return (
    <svg
      width='12'
      height='14'
      viewBox='0 0 12 14'
      xmlns='http://www.w3.org/2000/svg'
      className={styles.locationBtn}
      onClick={onClick}
    >
      <path d='M5.68693 12.459C6.00281 13.4437 6.602 13.4784 7.02469 12.5398L11.8299 1.86278C12.2526 0.922268 11.8607 0.516777 10.9547 0.95512L0.658114 5.9374C-0.247905 6.37575 -0.21351 6.99712 0.735049 7.32565L4.44873 8.60876L5.68693 12.459Z' />
    </svg>
  );
};

LocationButton.propTypes = {
  onClick: PropTypes.func,
};

export default LocationButton;
