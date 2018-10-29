import logger from 'redux-logger';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import printReducer from '../reducers/print';

const finalCreateStore = compose(
  applyMiddleware(logger),
)(createStore);

export function configureStore(initialState) {
  return finalCreateStore(printReducer, initialState);
}
