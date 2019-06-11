import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

// renders React component into DOM
ReactDOM.render(
  // provider allows usage of Redux store for wrapped container
  <Provider store={store}>
    <App /> 
  </Provider>,
  document.getElementById('root'),
);
