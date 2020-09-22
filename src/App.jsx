import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components";
import styles from "./App.module.scss";
import Navigator from "./routes/Navigator";

class App extends Component {
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

export default App;
