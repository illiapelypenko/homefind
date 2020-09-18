import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header, NothingFound } from '../components';
import {
  Home,
  SearchResults,
  PropertyPage,
  FavoriteProperties,
} from '../containers';
import styles from './App.module.scss';
import { setCardSize, setFavs } from '../store/actions';

class App extends Component {
  componentDidMount() {
    this.getPersistedData();
  }

  getPersistedData() {
    const cardSize = localStorage.getItem('cardSize');
    this.props.dispatch(setCardSize(cardSize));

    const persistedData = localStorage.getItem('favs');
    persistedData
      ? this.props.dispatch(setFavs(JSON.parse(persistedData)))
      : localStorage.setItem('favs', []);
  }

  render() {
    return (
      <BrowserRouter>
        <div className={styles.container}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/search" component={SearchResults} />
            <Route path="/nothingfound" component={NothingFound} />
            <Route path="/property" component={PropertyPage} />
            <Route path="/faves" component={FavoriteProperties} />
            <Route path="/" component={NothingFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, null)(App);
