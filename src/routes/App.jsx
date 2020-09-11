import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Header } from '../components';
import { Home, SearchResults } from '../containers';
import styles from './App.module.scss';

const history = createBrowserHistory({
  forceRefresh: true,
});

const App = () => {
  return (
    <Router history={history}>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={SearchResults} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
