import React from 'react';
import ReactDOM from 'react-dom/client';
import './vendors/normalize.module.css';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';

import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

reportWebVitals();
