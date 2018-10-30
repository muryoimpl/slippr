import Immutable from 'immutable';
import * as Types from './constant';

import { convertTimeToNumber, timerCalculator } from './utils';

const DEFAULT_TIMER_VALUE = '00:05:00';
const TIMER_CLEARED_VALUE = '00:00:00';
const initialTime = convertTimeToNumber(DEFAULT_TIMER_VALUE);
const initialState = new Immutable.Record({
  limit: DEFAULT_TIMER_VALUE,
  hours: initialTime[0],
  minutes: initialTime[1],
  seconds: initialTime[2],
  started: false,
  intervalId: null,
  blink: false,
})();

export default function timers(state = initialState, action) {
  switch (action.type) {
    case Types.RESET_TIMER: {
      const time = convertTimeToNumber(DEFAULT_TIMER_VALUE);
      return state.merge({
        limit: DEFAULT_TIMER_VALUE, hours: time[0], minutes: time[1], seconds: time[2],
      });
    }
    case Types.CHANGE_VALUE:
      return state.merge({
        limit: action.limit, hours: action.hours, minutes: action.minutes, seconds: action.seconds,
      });

    case Types.RUN_TICKER: {
      const calculated = timerCalculator(action.hours, action.minutes, action.seconds);
      return state.merge({ hours: calculated[0], minutes: calculated[1], seconds: calculated[2] });
    }
    case Types.START_TIMER:
      return state.merge({ started: true, intervalId: action.intervalId });

    case Types.STOP_TIMER:
      clearInterval(action.intervalId);
      return state.merge({ intervalId: null, started: false });

    case Types.CLEAR_TIMER:
      return state.merge({
        limit: TIMER_CLEARED_VALUE, hours: 0, minutes: 0, seconds: 0,
      });

    case Types.START_BLINK_PAGE:
      return state.merge({ blink: true });

    case Types.STOP_BLINK_PAGE:
      return state.merge({ blink: false });

    default:
      return state;
  }
}
