import { combineReducers } from 'redux';

import timers from '../containers/TimerWindow/reducer';

const timerReducer = combineReducers({
  timers,
});

export default timerReducer;
