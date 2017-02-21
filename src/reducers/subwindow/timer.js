import Immutable from 'immutable'
import * as Types from '../../constants/subwindow/actions'
import * as Settings from '../../constants/settings'

import { convertTimeToNumber, timerCalculator } from '../../utils/timeConverter'

const initialTime = convertTimeToNumber(Settings.DEFAULT_TIMER_VALUE)
const initialState = Immutable.Map({
  limit: Settings.DEFAULT_TIMER_VALUE,
  minutes: initialTime[0],
  seconds: initialTime[1],
  started: false,
  intervalId: null
})

export default function timers (state = initialState, action) {
  switch (action.type) {
    case Types.RESET_TIMER:
      const time = convertTimeToNumber(Settings.DEFAULT_TIMER_VALUE)
      return Immutable.fromJS(state).merge({ limit: Settings.DEFAULT_TIMER_VALUE, minutes: time[0], seconds: time[1] }).toJS()
    case Types.CHANGE_VALUE:
      return Immutable.fromJS(state).merge({ limit: action.limit, minutes: action.minutes, seconds: action.seconds }).toJS()
    case Types.RUN_TICKER:
      const calculated = timerCalculator(action.minutes, action.seconds)
      return Immutable.fromJS(state).merge({ minutes: calculated[0], seconds: calculated[1] }).toJS()
    case Types.START_TIMER:
      return Immutable.fromJS(state).merge({ started: true, intervalId: action.intervalId }).toJS()
    case Types.STOP_TIMER:
      clearInterval(action.intervalId)
      return Immutable.fromJS(state).merge({ intevalId: null, started: false }).toJS()
    default:
      return state
  }
}
