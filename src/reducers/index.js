import { combineReducers } from 'redux'

import homes from './home'
import headers from './header'

const rootReducer = combineReducers({
  headers,
  homes
})

export default rootReducer
