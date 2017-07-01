import Immutable from 'immutable'
import * as Types from '../constants/actions'

const initialState = new Immutable.Record({
  filename: '',
  fullscreen: false,
  playscreen: false
})()

export default function headers (state = initialState, action) {
  switch (action.type) {
    case Types.SET_FILE_NAME:
      return state.merge({filename: action.filename})
    case Types.SET_FULL_SCREEN:
      return state.merge({fullscreen: action.fullscreen})
    case Types.SET_PLAY_SCREEN:
      return state.merge({playscreen: action.playscreen})
    case Types.SHOW_DEFAULT:
    default:
      return state
  }
}
