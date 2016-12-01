import Immutable from 'immutable'
import * as Types from '../constants/header'

const initialState = Immutable.Map({
  filename: '',
  fullscreen: false
})

export default function headers (state = initialState, action) {
  switch (action.type) {
    case Types.SET_FILE_NAME:
      return Immutable.fromJS(state).merge({ filename: action.filename }).toJS()
    case Types.SET_FULL_SCREEN:
      return Immutable.fromJS(state).merge({ fullscreen: action.fullscreen }).toJS()
    case Types.SHOW_DEFAULT:
    default:
      return state
  }
}
