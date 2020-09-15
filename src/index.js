import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import './styles/base.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
