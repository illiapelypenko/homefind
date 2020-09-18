import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropertyList, SearchResultsTopPanel } from '../../components';
import { ReactComponent as SmallSpinner } from '../../assets/icons/smallSpinner.svg';
import { ReactComponent as BigSpinner } from '../../assets/icons/bigSpinner.svg';
import { getProperties } from '../../store/actions';
import styles from './SearchResults.module.scss';

class SearchResultsComponent extends Component {
  state = {
    offset: 0,
    propertiesIsLoading: false,
  };

  #SHOW_MORE_PROPS_VALUE = 20;

  componentDidMount() {
    this.getProperties();
  }

  getProperties = async () => {
    const { location, dispatch, error, history, properties } = this.props;

    const params = new URLSearchParams(location.search);
    const city = params.get('city');
    const state_code = params.get('state_code');

    await dispatch(getProperties(city, state_code));

    if (error.type === 'GET_PROPERTIES')
      history.push('/nothingfound', {
        message: error.message,
      });

    if (properties.length === 0)
      history.push('/nothingfound', {
        message: 'We are sorry! We have not found any properties.',
      });
  };

  handleLoadMoreBtnClick = () => {
    const scrollY = window.scrollY;

    this.setState({ propertiesIsLoading: true });

    setTimeout(() => {
      this.setState(
        state => ({
          offset: state.offset + this.#SHOW_MORE_PROPS_VALUE,
          propertiesIsLoading: false,
        }),
        () => window.scrollTo(0, scrollY)
      );
    }, 2000);
  };

  render() {
    const { properties } = this.props;

    const { offset, propertiesIsLoading } = this.state;

    const canLoadMoreProperties =
      properties.length - offset - this.#SHOW_MORE_PROPS_VALUE > 0;

    const topPanelText = `${
      offset + this.#SHOW_MORE_PROPS_VALUE < properties.length
        ? offset + this.#SHOW_MORE_PROPS_VALUE
        : properties.length
    } of ${properties.length} matches`;

    return properties.length > 0 ? (
      <div className={styles.container}>
        <SearchResultsTopPanel text={topPanelText} />
        <PropertyList
          properties={properties.slice(0, offset + this.#SHOW_MORE_PROPS_VALUE)}
        />
        {canLoadMoreProperties &&
          (propertiesIsLoading ? (
            <div className={styles.loadMore}>
              <SmallSpinner className={styles.spinner} />
              <span> Loading...</span>
            </div>
          ) : (
            <button
              onClick={this.handleLoadMoreBtnClick}
              className={styles.loadMoreBtn}
            >
              Load more ...
            </button>
          ))}
      </div>
    ) : (
      <div className={styles.loading}>
        <BigSpinner className={styles.spinner} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { properties, error } = state;
  return { properties, error };
}

export const SearchResults = connect(
  mapStateToProps,
  null
)(withRouter(SearchResultsComponent));
