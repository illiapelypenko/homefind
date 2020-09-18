import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Home,
  SearchResults,
  PropertyPage,
  FavoriteProperties,
} from '../containers';
import { NothingFound } from '../components';

function Navigator() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={SearchResults} />
      <Route path="/nothingfound" component={NothingFound} />
      <Route path="/property" component={PropertyPage} />
      <Route path="/faves" component={FavoriteProperties} />
      <Route path="/" component={NothingFound} />
    </Switch>
  );
}

export default Navigator;
