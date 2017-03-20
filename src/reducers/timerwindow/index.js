import { combineReducers } from 'redux'

import timers from './timer'

const timerReducer = combineReducers({
  timers
})

export default timerReducer
