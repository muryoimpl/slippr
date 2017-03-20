import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'

import childReducer from '../reducers/timerwindow'

const logger = createLogger()
const finalCreateStore = compose(
  applyMiddleware(logger),
)(createStore)

export function configureStore (initialState) {
  return finalCreateStore(childReducer, initialState)
}
