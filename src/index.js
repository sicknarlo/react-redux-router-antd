import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import './index.css';
import store, { history } from './store/store';
import Router from './router';
import registerServiceWorker from './registerServiceWorker';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={history} />
    </Provider>
  ), document.getElementById('root')
);
registerServiceWorker();
