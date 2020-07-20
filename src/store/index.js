import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import apiMiddleware from './apiMiddleware';
import localStorageMiddleware from './localStorageMiddleware';

const middlewares = [apiMiddleware, localStorageMiddleware];

// In case the environment is not 'production', enable dev tools
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production'
    ? compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    : applyMiddleware(...middlewares)
);

export default store;
