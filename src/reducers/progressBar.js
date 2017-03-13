import Immutable from 'immutable'
import * as Types from '../constants/actions'

const initialState = new Immutable.Record({ progress: 0, elapsedSeconds: 0, totalSeconds: 0, intervalId: null })()

export default function progressBar (state = initialState, action) {
  switch (action.type) {
    case Types.UPDATE_PROGRESS:
      const progress = 100 / (action.size - 1) * action.index
      return state.merge({progress: progress})
    case Types.UPDATE_ELAPSED_SECONDS:
      return state.merge({elapsedSeconds: Number(action.elapsedSeconds) + 1})
    case Types.SET_TOTAL_SECONDS:
      return state.merge({totalSeconds: action.totalSeconds})
    case Types.SET_ELAPSED_INTERVAL_ID:
      return state.merge({intervalId: action.intervalId})
    case Types.STOP_ELAPSED_TIME_RUNNING:
      clearInterval(action.intervalId)
      return state.merge({intervalId: null})
    default:
      return state
  }
}
