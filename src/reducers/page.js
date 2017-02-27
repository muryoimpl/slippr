import Immutable from 'immutable'
import * as Types from '../constants/actions'

const initialState = Immutable.Map({ idx: 0, markdownPages: [], blink: false, progress: 0 })

export default function pages (state = initialState, action) {
  switch (action.type) {
    case Types.SPLIT_MARKDOWN_AS_PAGES:
      return Immutable.fromJS(state).merge({ markdownPages: action.markdownPages }).toJS()
    case Types.UPDATE_PAGE_INDEX:
      return Immutable.fromJS(state).merge({ idx: action.idx }).toJS()
    case Types.START_BLINK_PAGE:
      return Immutable.fromJS(state).merge({ blink: true }).toJS()
    case Types.STOP_BLINK_PAGE:
      return Immutable.fromJS(state).merge({ blink: false }).toJS()
    case Types.UPDATE_PROGRESS:
      const progress = 100 / (action.size - 1) * action.index
      return Immutable.fromJS(state).merge({ progress: progress }).toJS()
    default:
      return state
  }
}
