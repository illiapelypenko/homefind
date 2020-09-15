import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ReactComponent as LocationIcon } from '../../assets/icons/location.svg';
import { http } from '../../utils/request';
import styles from './Search.module.scss';

class SearchComponent extends Component {
  #timeout;

  state = {
    inputValue: '',
    displaySuggestions: false,
    place: {},
    suggestions: [],
    error: '',
  };

  componentDidMount() {
    this.getSuggestions('a');
  }

  componentDidUpdate() {
    if (this.state.error) setTimeout(() => this.setState({ error: '' }), 2000);
  }

  getSuggestions = async place => {
    if (!place) place = 'a';

    try {
      const BASE_URL = 'https://realtor.p.rapidapi.com';
      const SUGGESTIONS_URL = BASE_URL + '/locations/auto-complete';
      const urlParams = encodeURI(`?input=${place}`);
      const suggestions = await http(SUGGESTIONS_URL, urlParams);

      if (suggestions.autocomplete.length === 0) {
        this.setState({
          error: 'There were no suggestions found for the given location.',
          suggestions: [],
        });
        return;
      }

      this.setState({
        suggestions: suggestions.autocomplete,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleLocationButtonClick = e => {
    e.preventDefault();

    this.setState({ error: 'The use of location is currently disabled.' });
  };

  handleFocus = () => {
    this.setState({
      displaySuggestions: true,
      error: '',
    });
  };

  handleBlur = () => {
    if (!this.state.suggestionsHover) {
      this.setState({
        displaySuggestions: false,
      });
    }
  };

  handleChange = e => {
    const updateSuggestions = () => {
      if (this.#timeout) clearTimeout(this.#timeout);

      this.#timeout = setTimeout(
        () => this.getSuggestions(this.state.inputValue),
        1000
      );
    };

    const inputValue = e.target.value;
    this.setState({ inputValue }, updateSuggestions);
  };

  handleMouseOver = () => {
    this.setState({ suggestionsHover: true });
  };

  handleMouseOut = () => {
    this.setState({ suggestionsHover: false });
  };

  handleSuggestionClick = suggestion => {
    this.setState({
      inputValue: `${suggestion.state_code}, ${suggestion.city}`,
      displaySuggestions: false,
      place: suggestion,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { city, state_code } = this.state.place;

    if (!city) {
      this.setState({ error: 'Please choose a suggested place' });
      return;
    }

    this.setState({ inputValue: '' });

    this.props.history.push(`/search?city=${city}&state_code=${state_code}`);
  };

  renderSuggestions = () => {
    const { suggestions } = this.state;

    return suggestions
      .filter(suggestion => suggestion.area_type === 'city')
      .map((suggestion, index) => (
        <li
          onClick={() => this.handleSuggestionClick(suggestion)}
          key={index}
          className={styles.suggestion}
        >
          {suggestion.state_code}, {suggestion.city}
        </li>
      ))
      .slice(0, 6);
  };

  render() {
    const { inputValue, displaySuggestions, error } = this.state;

    return (
      <form className={styles.form}>
        <div className={styles.locationInput}>
          <button
            className={styles.locationBtn}
            onClick={this.handleLocationButtonClick}
          >
            <LocationIcon />
          </button>

          <input
            type="text"
            name="location"
            id="location"
            value={inputValue}
            autoComplete="off"
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {!inputValue && (
            <span className={styles.placeholder}>
              Name of cities, districts, places
            </span>
          )}
          <ul
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
            className={styles.suggestions}
          >
            {displaySuggestions && !error && this.renderSuggestions()}
            {error && <li className={styles.error}>{error}</li>}
          </ul>
        </div>
        <input
          onClick={this.handleSubmit}
          type="submit"
          value="Go"
          className={styles.submitBtn}
        />
      </form>
    );
  }
}

export const Search = withRouter(SearchComponent);
