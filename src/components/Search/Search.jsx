import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { http } from '../../utils/request';
import styles from './Search.module.scss';

class SearchPage extends Component {
  #timeout;

  state = {
    inputValue: '',
    displaySuggestions: false,
    place: {},
    suggestions: [],
    error: '',
  };

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

  componentDidMount() {
    this.getSuggestions('a');
  }

  componentDidUpdate() {
    if (this.state.error) setTimeout(() => this.setState({ error: '' }), 2000);
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.place.city) {
      this.setState({ error: 'Please choose a suggested place' });
      return;
    }
    this.setState({ inputValue: '' });
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

  handleSuggestionClick = suggestion => {
    this.setState({
      inputValue: `${suggestion.state_code}, ${suggestion.city}`,
      displaySuggestions: false,
      place: suggestion,
    });
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

  handleMouseOver = () => {
    this.setState({ suggestionsHover: true });
  };

  handleMouseOut = () => {
    this.setState({ suggestionsHover: false });
  };

  handleLocationButtonClick = e => {
    e.preventDefault();
    this.setState({ error: 'The use of location is currently disabled.' });
  };

  render() {
    const { inputValue, displaySuggestions, suggestions, error } = this.state;

    function hightlight(suggestion) {
      const text = `${suggestion.state_code}, ${suggestion.city}`;

      const jsxText = text
        .split('')
        .map((char, index) => <span key={index}>{char}</span>);

      const index = `${suggestion.state_code}, ${suggestion.city}`.search(
        new RegExp(inputValue, 'i')
      );

      let keyIndex = index;

      const hightlightedJsx = [...text]
        .splice(index, inputValue.length)
        .map(char => <b key={keyIndex++}>{char}</b>);

      jsxText.splice(index, inputValue.length, ...hightlightedJsx);

      return jsxText;
    }

    return (
      <form className={styles.form}>
        <div className={styles.locationInput}>
          <button
            className={styles.locationBtn}
            onClick={this.handleLocationButtonClick}
          >
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.68693 12.459C6.00281 13.4437 6.602 13.4784 7.02469 12.5398L11.8299 1.86278C12.2526 0.922268 11.8607 0.516777 10.9547 0.95512L0.658114 5.9374C-0.247905 6.37575 -0.21351 6.99712 0.735049 7.32565L4.44873 8.60876L5.68693 12.459Z" />
            </svg>
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
          <span
            className={`${styles.placeholder} ${
              inputValue ? styles.placeholderTop : ''
            }`}
          >
            Name of cities, districts, places
          </span>
          <ul
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
            className={styles.suggestions}
          >
            {displaySuggestions &&
              !error &&
              suggestions.map((suggestion, index) => (
                <li
                  onClick={() => this.handleSuggestionClick(suggestion)}
                  key={index}
                  className={styles.suggestion}
                >
                  {hightlight(suggestion)}
                </li>
              ))}
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

export default withRouter(SearchPage);
