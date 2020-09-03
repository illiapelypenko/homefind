import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Header from '../Header/Header';
import SearchPage from '../SearchPage/SearchPage';

export default class App extends Component {
  state = {
    suggestions: [],
    location: {},
  };

  http = async ({ url, urlParams = '', method = 'GET' }) => {
    const API_KEY = '111f4ef646msh0edca9349d6475cp1b2e0cjsn85aad4b1d986';
    const X_RAPID_HOST = 'realtor.p.rapidapi.com';
    const headers = {
      'x-rapidapi-host': X_RAPID_HOST,
      'x-rapidapi-key': API_KEY,
    };

    function wait(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }

    try {
      const timeout = async (time = 10000) => {
        await wait(time);

        throw Error('Session timeout');
      };

      const query = () =>
        fetch(url + urlParams, {
          headers,
        });

      const response = await Promise.race([query(), timeout()]);
      const data = await response.json();

      return data.autocomplete;
    } catch (e) {
      console.log(e);
    }
  };

  getSuggestions = async location => {
    if (!location) location = 'a';
    const BASE_URL = 'https://realtor.p.rapidapi.com';
    const SUGGESTIONS_URL = BASE_URL + '/locations/auto-complete';
    const urlParams = encodeURI(`?input=${location}`);
    const suggestions = await this.http({ url: SUGGESTIONS_URL, urlParams });
    this.setState({ ...this.state, suggestions });
  };

  componentDidMount() {
    this.getSuggestions('a');
  }

  handleSuggestionClick = location => {
    this.setState({ ...this.state, location });
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
                suggestions={this.state.suggestions}
                onSuggestionClick={this.handleSuggestionClick}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
