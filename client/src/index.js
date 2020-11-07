import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import 'bootstrap/dist/css/bootstrap.min.css';

// Create the react component place it in root
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);