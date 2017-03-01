import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

const logger = createLogger()
const finalCreateStore = compose(
  applyMiddleware(logger, thunk),
)(createStore)

export function configureStore (initialState) {
  return finalCreateStore(rootReducer, initialState)
}
