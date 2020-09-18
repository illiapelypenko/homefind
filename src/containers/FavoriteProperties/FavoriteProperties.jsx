import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropertyList, SearchResultsTopPanel } from '../../components';
import styles from './FavoriteProperties.module.scss';

class FavoritePropertiesComponent extends Component {
  render() {
    const topPanelText = 'Favorites';
    const areFavs = this.props.favs.length || localStorage.getItem('favs');

    return (
      <div className={styles.container}>
        <SearchResultsTopPanel text={topPanelText} textSize="big" />
        {areFavs ? (
          <PropertyList properties={this.props.favs} />
        ) : (
          <Redirect
            to={{
              pathname: '/nothingfound',
              state: {
                message:
                  'You have not added any properties to your favourites.',
                fromFav: true,
              },
            }}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { favs } = state;
  return { favs };
}

export const FavoriteProperties = connect(
  mapStateToProps,
  null
)(withRouter(FavoritePropertiesComponent));
