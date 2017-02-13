import Immutable from 'immutable'
import * as Types from '../constants'

const initialState = Immutable.Map({ idx: 0, markdownPages: [] })

export default function pages (state = initialState, action) {
  switch (action.type) {
    case Types.SPLIT_MARKDOWN_AS_PAGES:
      return Immutable.fromJS(state).merge({ markdownPages: action.markdownPages }).toJS()
    case Types.UPDATE_PAGE_INDEX:
      return Immutable.fromJS(state).merge({ idx: action.idx }).toJS()
    default:
      return state
  }
}
