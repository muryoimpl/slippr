import Immutable from 'immutable'
import * as Types from '../../constants/subwindow/actions'
import * as Settings from '../../constants/settings'

import { convertTimeToNumber, timerCalculator } from '../../utils/timeConverter'

const initialTime = convertTimeToNumber(Settings.DEFAULT_TIMER_VALUE)
const initialState = Immutable.Map({
  limit: Settings.DEFAULT_TIMER_VALUE,
  hours: initialTime[0],
  minutes: initialTime[1],
  seconds: initialTime[2],
  started: false,
  intervalId: null
})

export default function timers (state = initialState, action) {
  switch (action.type) {
    case Types.RESET_TIMER:
      const time = convertTimeToNumber(Settings.DEFAULT_TIMER_VALUE)
      return Immutable.fromJS(state).merge({ limit: Settings.DEFAULT_TIMER_VALUE, hours: time[0], minutes: time[1], seconds: time[2] }).toJS()
    case Types.CHANGE_VALUE:
      return Immutable.fromJS(state).merge({ limit: action.limit, hours: action.hours, minutes: action.minutes, seconds: action.seconds }).toJS()
    case Types.RUN_TICKER:
      const calculated = timerCalculator(action.hours, action.minutes, action.seconds)
      return Immutable.fromJS(state).merge({ hours: calculated[0], minutes: calculated[1], seconds: calculated[2] }).toJS()
    case Types.START_TIMER:
      return Immutable.fromJS(state).merge({ started: true, intervalId: action.intervalId }).toJS()
    case Types.STOP_TIMER:
      clearInterval(action.intervalId)
      return Immutable.fromJS(state).merge({ intevalId: null, started: false }).toJS()
    default:
      return state
  }
}
