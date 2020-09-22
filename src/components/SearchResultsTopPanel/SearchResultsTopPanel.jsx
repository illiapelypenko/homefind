import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ReactComponent as BtnLeftIcon } from "../../assets/icons/btnLeftIcon.svg";
import { ReactComponent as BtnRightIcon } from "../../assets/icons/btnRightIcon.svg";
import { setCardSize } from "../../store/actions";
import styles from "./SearchResultsTopPanel.module.scss";

class SearchResultsTopPanelComponent extends Component {
  render() {
    const { cardSize, text, textSize, setCardSize } = this.props;

    return (
      <div className={styles.searchResultsHeader}>
        <span
          className={`${styles.searchResultsHeaderText} ${
            textSize === "big" ? styles.searchResultsHeaderTextBig : ""
          }`}
        >
          {text}
        </span>
        <div className={styles.cardSizeToggler}>
          <button
            className={`${styles.btnLeft} ${
              cardSize === "standart" ? styles.btnSelected : null
            }`}
            onClick={() => setCardSize("standart")}
          >
            <BtnLeftIcon />
          </button>
          <button
            className={`${styles.btnRight} ${
              cardSize === "minified" ? styles.btnSelected : null
            }`}
            onClick={() => setCardSize("minified")}
          >
            <BtnRightIcon />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cardSize }) => ({ cardSize });

const mapDispatchToProps = { setCardSize };

export const SearchResultsTopPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchResultsTopPanelComponent));
