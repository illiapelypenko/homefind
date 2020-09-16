import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PropertyList } from '../../components';
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
    else
      this.props.history.push('/nothingfound', {
        message: 'No favs',
      });
  }

  render() {
    return (
      <div className={styles.container}>
        <PropertyList
          properties={this.state.favs}
          cardSize={this.state.cardSize}
        />
      </div>
    );
  }
}

export const FavoriteProperties = withRouter(FavoritePropertiesComponent);
