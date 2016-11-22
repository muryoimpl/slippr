import * as Types from '../constants/home'

const initialState = {}

export default function homes (state = initialState, action) {
  switch (action.type) {
    case Types.SET_MARKDOWN_TEXT:
      return Object.assign({}, state, { markdown: action.markdown })
    case Types.SHOW_HOME:
    default:
      return state
  }
}
