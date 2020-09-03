import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchPage.module.scss';
import LocationButton from './LocationButton';

class SearchPage extends Component {
  static propTypes = {
    getSuggestions: PropTypes.func,
    onSuggestionClick: PropTypes.func,
    suggestions: PropTypes.array,
  };

  timeout;

  state = {
    inputValue: '',
    focusInput: false,
    location: {},
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState(state => ({ ...state, inputValue: '' }));
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
    this.setState(state => ({ ...state, inputValue }), updateSuggestions);
  };

  handleSuggestionClick = suggestion => {
    console.log('!');
    this.setState({
      ...this.state,
      inputValue: `${suggestion.state_code}, ${suggestion.city}`,
    });
    this.props.onSuggestionClick(suggestion);
  };

  render() {
    const { suggestions } = this.props;
    const { inputValue, focusInput } = this.state;
    const displaySuggestions = suggestions.length > 0 && focusInput;

    return (
      <main className={styles.searchPage}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.locationInput}>
            <LocationButton />
            <input
              type='text'
              name='location'
              id='location'
              value={inputValue}
              onChange={this.handleChange}
              autoComplete='off'
              onFocus={() => this.setState({ ...this.state, focusInput: true })}
              onBlur={() => this.setState({ ...this.state, focusInput: false })}
            />
            <span
              className={`${styles.placeholder} ${
                inputValue && styles.placeholderOnTop
              }`}
            >
              Name of cities, districts, places
            </span>
          </div>
          <input type='submit' value='Go' className={styles.submitBtn} />
          <ul
            className={`${styles.suggestions} ${
              displaySuggestions ? styles.suggestionsShow : ''
            }`}
          >
            {displaySuggestions
              ? suggestions.map((suggestion, index) => (
                  <li
                    onClick={() => this.handleSuggestionClick(suggestion)}
                    key={index}
                    className={styles.suggestion}
                  >
                    {suggestion.state_code}, {suggestion.city}
                  </li>
                ))
              : null}
          </ul>
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
