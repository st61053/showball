import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';

import { createAppReducer } from './appReducer';

const composeEnhancers = process.env.NODE_ENV !== 'production' ?
  ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;

export const configureStore = (initialState: object = {}) => {

  return createStore(
    createAppReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk
      ),
    ),
  );
};

export const injectPluginsReducers = (store: Store) => {
  store.replaceReducer(createAppReducer());
};