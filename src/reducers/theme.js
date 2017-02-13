import Immutable from 'immutable'
import * as Types from '../constants'

const initialState = Immutable.Map({ selected: 'theBridge' })

export default function themes (state = initialState, action) {
  switch (action.type) {
    case Types.SELECT_THEME:
      return Immutable.fromJS(state).merge({ selected: action.theme }).toJS()
    default:
      return state
  }
}
