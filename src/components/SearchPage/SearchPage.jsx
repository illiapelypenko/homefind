import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchPage.module.scss';
import LocationButton from './LocationButton';

class SearchPage extends Component {
  static propTypes = {
    getSuggestions: PropTypes.func,
    getProperties: PropTypes.func,
    onSuggestionClick: PropTypes.func,
    suggestions: PropTypes.array,
    location: PropTypes.object,
  };

  timeout;

  state = {
    inputValue: '',
    displaySuggestions: false,
    error: '',
    displayError: false,
  };

  static getDerivedStateFromProps(props, state) {
    const error = 'There were no suggestion found for the given location.';
    if (props.suggestions.length === 0)
      return {
        error,
        displayError: true,
      };
    else
      return state.error === error ? { error: '', displayError: false } : null;
  }

  handleSubmit = e => {
    e.preventDefault();

    const { location, getProperties } = this.props;

    if (!location.city) {
      this.setState(() => ({
        error: 'Please choose a suggested location',
        displayError: true,
      }));
      return;
    }
    this.setState(() => ({ inputValue: '' }));
    getProperties();
  };

  handleChange = e => {
    const updateSuggestions = () => {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.props.getSuggestions(this.state.inputValue),
        1000
      );
    };

    const inputValue = e.target.value;
    this.setState(() => ({ inputValue }), updateSuggestions);
  };

  handleSuggestionClick = suggestion => {
    this.setState(() => ({
      inputValue: `${suggestion.state_code}, ${suggestion.city}`,
      displaySuggestions: false,
    }));
    this.props.onSuggestionClick(suggestion);
  };

  handleLocationButtonClick = () => {
    this.setState(() => ({
      error: 'The use of location is currently disabled.',
      displayError: true,
    }));
  };

  render() {
    const { suggestions } = this.props;
    const {
      inputValue,
      displaySuggestions,
      suggestionsHover,
      error,
      displayError,
    } = this.state;

    return (
      <main className={styles.searchPage}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div
            className={styles.locationInput}
            onFocus={() =>
              this.setState(() => ({
                displaySuggestions: true,
                displayError: false,
              }))
            }
            onBlur={() => {
              if (!suggestionsHover) {
                this.setState(() => ({
                  displaySuggestions: false,
                }));
              }
            }}
          >
            <LocationButton onClick={this.handleLocationButtonClick} />
            <input
              type='text'
              name='location'
              id='location'
              value={inputValue}
              onChange={this.handleChange}
              autoComplete='off'
            />
            <span
              className={`${styles.placeholder} ${
                inputValue && styles.placeholderOnTop
              }`}
            >
              Name of cities, districts, places
            </span>
            <ul
              onMouseOver={() =>
                this.setState(() => ({ suggestionsHover: true }))
              }
              onMouseOut={() =>
                this.setState(() => ({ suggestionsHover: false }))
              }
              className={styles.suggestions}
            >
              {displaySuggestions
                ? suggestions.map((suggestion, index) => {
                    return (
                      <li
                        onClick={() => this.handleSuggestionClick(suggestion)}
                        key={index}
                        className={styles.suggestion}
                      >
                        {suggestion.state_code}, {suggestion.city}
                      </li>
                    );
                  })
                : null}
              {displayError ? <li className={styles.error}>{error}</li> : null}
            </ul>
          </div>
          <input type='submit' value='Go' className={styles.submitBtn} />
        </form>
        <div className={styles.background}>
          <h1>Find Home Your Dream!</h1>
          <span>
            Use the form above to search for houses to buy. You can search by
            place-name, postcode, or click “My location”, to search in your
            current location.
          </span>
        </div>
      </main>
    );
  }
}

export default SearchPage;
