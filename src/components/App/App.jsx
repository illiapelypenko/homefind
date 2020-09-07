import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Header from '../Header/Header';
import SearchPage from '../SearchPage/SearchPage';
import { http } from '../../utils/request';
import styles from './App.module.scss';

const history = createBrowserHistory();

export default class App extends Component {
  state = {
    suggestions: [],
    place: {},
  };

  getProperties = async () => {};

  getSuggestions = async place => {
    if (!place) place = 'a';

    try {
      const BASE_URL = 'https://realtor.p.rapidapi.com';
      const SUGGESTIONS_URL = BASE_URL + '/locations/auto-complete';
      const urlParams = encodeURI(`?input=${place}`);
      const suggestions = await http(SUGGESTIONS_URL, urlParams);

      this.setState({
        suggestions: suggestions ? suggestions.autocomplete : [],
      });
    } catch (e) {
      // set error in app root ?
    }
  };

  componentDidMount() {
    this.getSuggestions('a');
  }

  handleSuggestionClick = place => {
    this.setState({ place });
  };

  render() {
    return (
      <Router history={history}>
        <div className={styles.container}>
          <Switch>
            <Route exact path='/'>
              <Header />
              <SearchPage
                getSuggestions={this.getSuggestions}
                getProperties={this.getProperties}
                suggestions={this.state.suggestions}
                onSuggestionClick={this.handleSuggestionClick}
                place={this.state.place}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
