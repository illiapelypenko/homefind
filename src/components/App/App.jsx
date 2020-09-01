import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Header from '../Header/Header';

export default class App extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Header />
      // <Router>
      //   <div className={styles.app}>
      //     <Switch>
      //       <Route exact path='/'>
      //       </Route>
      //     </Switch>
      //   </div>
      // </Router>
    );
  }
}
