import Immutable from 'immutable';
import * as Types from '../../constants/actions';

const initialState = new Immutable.Record({ markdown: '' })();

export default function textarea(state = initialState, action) {
  switch (action.type) {
    case Types.SET_MARKDOWN_TEXT:
    case Types.EDIT_TEXTAREA_VALUE:
      return state.merge({ markdown: action.markdown });
    case Types.SHOW_HOME:
    default:
      return state;
  }
}
