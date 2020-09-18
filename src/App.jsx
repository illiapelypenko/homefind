import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Header } from './components';
import styles from './App.module.scss';
import { setCardSize, setFavs } from './store/actions';
import Navigator from './routes/Navigator';

class App extends Component {
  componentDidMount() {
    this.getPersistedData();
  }

  getPersistedData() {
    const cardSize = localStorage.getItem('cardSize');
    this.props.dispatch(setCardSize(cardSize));

    const persistedData = localStorage.getItem('favs');
    persistedData
      ? this.props.dispatch(setFavs(JSON.parse(persistedData)))
      : localStorage.setItem('favs', []);
  }

  render() {
    return (
      <BrowserRouter>
        <div className={styles.container}>
          <Header />
          <Navigator />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, null)(App);
