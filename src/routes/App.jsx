import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Header } from '../components';
import { Home } from '../containers';
import styles from './App.module.scss';

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
