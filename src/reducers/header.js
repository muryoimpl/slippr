import Immutable from 'immutable'
import * as Types from '../constants/header'

const initialState = Immutable.Map({
  filename: ''
})

export default function headers (state = initialState, action) {
  switch (action.type) {
    case Types.SET_FILE_NAME:
      return state.merge({filename: action.filename}).toJS()
    case Types.SHOW_DEFAULT:
    default:
      return state
  }
}
