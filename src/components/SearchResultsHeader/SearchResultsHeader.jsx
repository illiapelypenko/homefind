import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as BtnLeftIcon } from '../../assets/icons/btnLeftIcon.svg';
import { ReactComponent as BtnRightIcon } from '../../assets/icons/btnRightIcon.svg';
import styles from './SearchResultsHeader.module.scss';

class SearchResultsHeaderComponent extends Component {
  render() {
    const { view, setView, text } = this.props;

    return (
      <div className={styles.searchResultsHeader}>
        <span className={styles.searchResultsHeaderText}>{text}</span>
        <div className={styles.viewToggler}>
          <button
            className={`${styles.btnLeft} ${
              view === 'standart' ? styles.btnSelected : null
            }`}
            onClick={() => setView('standart')}
          >
            <BtnLeftIcon />
          </button>
          <button
            className={`${styles.btnRight} ${
              view === 'minified' ? styles.btnSelected : null
            }`}
            onClick={() => setView('minified')}
          >
            <BtnRightIcon />
          </button>
        </div>
      </div>
    );
  }
}

export const SearchResultsHeader = withRouter(SearchResultsHeaderComponent);
