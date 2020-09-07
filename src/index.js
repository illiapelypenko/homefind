import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.jsx';
import './styles/base.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
