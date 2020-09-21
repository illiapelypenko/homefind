import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropertyList, SearchResultsTopPanel } from '../../components';
import styles from './FavoriteProperties.module.scss';

class FavoritePropertiesComponent extends Component {
  state = {
    cardSize: 'standart',
    favs: [],
  };

  componentDidMount() {
    const cardSize = localStorage.getItem('cardSize');

    cardSize
      ? this.setState({ cardSize })
      : localStorage.setItem('cardSize', this.state.cardSize);

    const persistedData = localStorage.getItem('favs');

    if (persistedData) this.setState({ favs: JSON.parse(persistedData) });
    if (!persistedData || JSON.parse(persistedData).length === 0)
      this.props.history.push('/nothingfound', {
        message: 'You have not added any properties to your favourites.',
        fromFav: true,
      });
  }

  setView = cardSize => {
    this.setState({ cardSize });

    localStorage.setItem('cardSize', cardSize);
  };

  render() {
    const topPanelText = 'Favorites';

    return (
      <div className={styles.container}>
        <SearchResultsTopPanel
          setView={this.setView}
          cardSize={this.state.cardSize}
          text={topPanelText}
          textSize="big"
        />
        <PropertyList
          properties={this.state.favs}
          cardSize={this.state.cardSize}
        />
      </div>
    );
  }
}

export const FavoriteProperties = withRouter(FavoritePropertiesComponent);
