import Immutable from 'immutable'
import * as Types from '../../constants/printwindow/actions'

const initialState = new Immutable.Record({
  markdown: '',
  theme: ''
})()

export default function prints (state = initialState, action) {
  switch (action.type) {
    case Types.DISPLAY_PRINT_PAGE:
      return state.merge({markdown: action.markdown, theme: action.theme})
    default:
      return state
  }
}
