import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header, NothingFound } from '../components';
import {
  Home,
  SearchResults,
  PropertyPage,
  FavoriteProperties,
} from '../containers';
import styles from './App.module.scss';

const App = () => {
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
};

export default App;
