import Immutable from 'immutable'
import * as Types from '../../constants/subwindow/actions'
import * as Settings from '../../constants/settings'

const initialState = Immutable.Map({
  limit: Settings.DEFAULT_TIMER_VALUE
})

export default function timers (state = initialState, action) {
  switch (action.type) {
    case Types.RESET_TIMER:
      return Immutable.fromJS(state).merge({ limit: Settings.DEFAULT_TIMER_VALUE }).toJS()
    case Types.CHANGE_VALUE:
      return Immutable.fromJS(state).merge({ limit: action.limit }).toJS()
    default:
      return state
  }
}
