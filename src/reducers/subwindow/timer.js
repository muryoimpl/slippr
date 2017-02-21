import Immutable from 'immutable'
import * as Types from '../../constants/subwindow/actions'
import * as Settings from '../../constants/settings'

import { convertTimeToNumber } from '../../utils/timeConverter'

const initialTime = convertTimeToNumber(Settings.DEFAULT_TIMER_VALUE)
const initialState = Immutable.Map({
  limit: Settings.DEFAULT_TIMER_VALUE,
  minutes: initialTime[0],
  seconds: initialTime[1]
})

export default function timers (state = initialState, action) {
  switch (action.type) {
    case Types.RESET_TIMER:
      const time = convertTimeToNumber(Settings.DEFAULT_TIMER_VALUE)
      return Immutable.fromJS(state).merge({ limit: Settings.DEFAULT_TIMER_VALUE, minutes: time[0], seconds: time[1] }).toJS()
    case Types.CHANGE_VALUE:
      return Immutable.fromJS(state).merge({ limit: action.limit, minutes: action.minutes, seconds: action.seconds }).toJS()
    case Types.START_TIMER:
    case Types.STOP_TIMER:
    default:
      return state
  }
}
