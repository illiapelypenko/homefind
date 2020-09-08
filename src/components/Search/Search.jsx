import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styles from './Search.module.scss';
import { http } from '../../utils/request';

class SearchPage extends Component {
  #timeout;

  state = {
    inputValue: '',
    displaySuggestions: false,
    error: '',
    displayError: false,
    place: {},
    suggestions: [],
  };

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
      // set error
    }
  };

  componentDidMount() {
    this.getSuggestions('a');
  }

  componentDidUpdate() {
    const error = 'There were no suggestion found for the given location.';

    if (this.state.suggestions.length === 0)
      this.setState({
        error,
        displayError: true,
      });
    else
      this.state.error === error &&
        this.setState({ error: '', displayError: false });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.place.city) {
      this.setState({
        error: 'Please choose a suggested location',
        displayError: true,
      });
      return;
    }

    this.setState({ inputValue: '' });

    this.props.history.push('/properties');
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
    });
    this.onSuggestionClick(suggestion);
  };

  handleLocationButtonClick = () => {
    this.setState({
      error: 'The use of location is currently disabled.',
      displayError: true,
    });
  };

  handleFocus = () => {
    this.setState({
      displaySuggestions: true,
      displayError: false,
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

  render() {
    const {
      inputValue,
      displaySuggestions,
      error,
      displayError,
      suggestions,
    } = this.state;

    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <div
          className={styles.locationInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        >
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
              suggestions.map((suggestion, index) => (
                <li
                  onClick={() => this.handleSuggestionClick(suggestion)}
                  key={index}
                  className={styles.suggestion}
                >
                  {suggestion.state_code}, {suggestion.city}
                </li>
              ))}
            {displayError && <li className={styles.error}>{error}</li>}
          </ul>
        </div>
        <input type="submit" value="Go" className={styles.submitBtn} />
      </form>
    );
  }
}

export default withRouter(SearchPage);
