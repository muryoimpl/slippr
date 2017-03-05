import Immutable from 'immutable'
import * as Types from '../constants/actions'

const initialState = Immutable.Map({ progress: 0, elapsedSeconds: 0, totalSeconds: 0, intervalId: null })

export default function progressBar (state = initialState, action) {
  switch (action.type) {
    case Types.UPDATE_PROGRESS:
      const progress = 100 / (action.size - 1) * action.index
      return Immutable.fromJS(state).merge({ progress: progress }).toJS()
    case Types.UPDATE_ELAPSED_SECONDS:
      return Immutable.fromJS(state).merge({ elapsedSeconds: action.elapsedSeconds }).toJS()
    case Types.SET_TOTAL_SECONDS:
      return Immutable.fromJS(state).merge({ totalSeconds: action.totalSeconds }).toJS()
    case Types.SET_ELAPSED_INTERVAL_ID:
      return Immutable.fromJS(state).merge({ intervalId: action.intervalId }).toJS()
    default:
      return state
  }
}
