import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './Setup';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { getStore } from './Store';

const store = getStore();

function render(App) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}


render(App)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
