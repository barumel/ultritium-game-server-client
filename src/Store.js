import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { isUndefined } from 'lodash';

import { loadState } from './LocalStorage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


let store;

/**
 * Configure / create the store
 *
 * @param  {Function} rootReducer Root reducer function
 * @param  {Function} sagas       Root saga
 *
 * @return {Object} store Store instance
 */
export function configureStore(rootReducer, sagas, preparePersistedState = state => state) {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(
    sagaMiddleware,
    createLogger(),
  );

  const persistedState = preparePersistedState({ ...loadState(localStorage), ...loadState(sessionStorage)});
  store = createStore(rootReducer, persistedState, composeEnhancers(
    middleware
  ));

  sagaMiddleware.run(sagas);

  return store;
}

/**
 * Return the current store instance
 *
 * @return {Object} store Store instance
 */
export function getStore() {
  if (isUndefined(store)) throw new Error('No store configured!');

  return store;
}
