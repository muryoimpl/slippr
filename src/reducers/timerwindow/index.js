import { combineReducers } from 'redux'

import timers from './timer'

const childReducer = combineReducers({
  timers
})

export default childReducer
