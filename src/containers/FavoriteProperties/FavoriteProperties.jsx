import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  PropertyList,
  SearchResultsTopPanel,
  NothingFound,
} from "../../components";
import styles from "./FavoriteProperties.module.scss";

class FavoritePropertiesComponent extends Component {
  render() {
    const topPanelText = "Favorites";

    return this.props.favs.length ? (
      <div className={styles.container}>
        <SearchResultsTopPanel text={topPanelText} textSize='big' />
        <PropertyList properties={this.props.favs} />
      </div>
    ) : (
      <NothingFound
        type='favorites'
        error='You have not added any properties to your favourites.'
      />
    );
  }
}

const mapStateToProps = ({ favs }) => ({ favs });

export const FavoriteProperties = connect(
  mapStateToProps,
  null
)(withRouter(FavoritePropertiesComponent));
