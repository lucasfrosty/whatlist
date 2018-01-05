import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { injectGlobal } from 'styled-components';

import configureStore from './store';
import App from './components/App';

const store = configureStore();

/* eslint-disable no-unused-expressions */
injectGlobal`
  #root {
    background-color: #E9EAEE;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root'),
);
