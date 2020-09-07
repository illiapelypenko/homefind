import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '../Header/Header';
import SearchPage from '../SearchPage/SearchPage';
import { http } from '../../utils/request';
import styles from './App.module.scss';

export default class App extends Component {
  state = {
    suggestions: [],
    location: {},
  };

  getProperties = async () => {};

  getSuggestions = async location => {
    if (!location) location = 'a';
    const BASE_URL = 'https://realtor.p.rapidapi.com';
    const SUGGESTIONS_URL = BASE_URL + '/locations/auto-complete';
    const urlParams = encodeURI(`?input=${location}`);
    const suggestions = await http({ url: SUGGESTIONS_URL, urlParams });
    this.setState({ suggestions });
  };

  componentDidMount() {
    this.getSuggestions('a');
  }

  handleSuggestionClick = location => {
    this.setState({ location });
  };

  render() {
    return (
      <Router>
        <div className={styles.app}>
          <Switch>
            <Route exact path='/'>
              <Header />
              <SearchPage
                getSuggestions={this.getSuggestions}
                getProperties={this.getProperties}
                suggestions={this.state.suggestions}
                onSuggestionClick={this.handleSuggestionClick}
                location={this.state.location}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
