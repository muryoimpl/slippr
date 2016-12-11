import Immutable from 'immutable'
import * as Types from '../constants/pages'

const initialState = Immutable.Map({ idx: 0, markdownPages: [] })

export default function pages (state = initialState, action) {
  switch (action.type) {
    case Types.SPLIT_MARKDOWN_AS_PAGES:
      return Immutable.fromJS(state).merge({ markdownPages: action.markdownPages }).toJS()
    default:
      return state
  }
}
