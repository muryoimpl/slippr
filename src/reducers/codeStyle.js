import Immutable from 'immutable'

import * as Types from '../constants/actions'

const initialState = Immutable.Map({ selected: 'default' })

export default function codeStyles (state = initialState, action) {
  switch (action.type) {
    case Types.SELECT_HIGHLIGHT_THEME:
      return Immutable.fromJS(state).merge({ selected: action.theme }).toJS()
    default:
      return state
  }
}
