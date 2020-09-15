import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Header } from '../components';
import { Home, SearchResults } from '../containers';
import styles from './App.module.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/search" component={SearchResults} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
