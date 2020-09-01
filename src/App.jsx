import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';

export default class App extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path='/'>
              <Header />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
