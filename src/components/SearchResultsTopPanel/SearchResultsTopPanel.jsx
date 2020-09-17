import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as BtnLeftIcon } from '../../assets/icons/btnLeftIcon.svg';
import { ReactComponent as BtnRightIcon } from '../../assets/icons/btnRightIcon.svg';
import styles from './SearchResultsTopPanel.module.scss';

class SearchResultsTopPanelComponent extends Component {
  render() {
    const { cardSize, setView, text, textSize } = this.props;

    return (
      <div className={styles.searchResultsHeader}>
        <span
          className={`${styles.searchResultsHeaderText} ${
            textSize === 'big' ? styles.searchResultsHeaderTextBig : ''
          }`}
        >
          {text}
        </span>
        <div className={styles.cardSizeToggler}>
          <button
            className={`${styles.btnLeft} ${
              cardSize === 'standart' ? styles.btnSelected : null
            }`}
            onClick={() => setView('standart')}
          >
            <BtnLeftIcon />
          </button>
          <button
            className={`${styles.btnRight} ${
              cardSize === 'minified' ? styles.btnSelected : null
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

export const SearchResultsTopPanel = withRouter(SearchResultsTopPanelComponent);