import createLogger from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'

const logger = createLogger()
const finalCreateStore = compose(
  applyMiddleware(logger),
)(createStore)

export function configureStore (initialState) {
  return finalCreateStore(rootReducer, initialState)
}
