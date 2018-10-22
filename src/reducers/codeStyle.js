import Immutable from 'immutable';

import * as Types from '../constants/actions';

const initialState = new Immutable.Record({ selected: 'default' })();

export default function codeStyles(state = initialState, action) {
  switch (action.type) {
    case Types.SELECT_HIGHLIGHT_THEME:
      return state.merge({ selected: action.theme });
    default:
      return state;
  }
}
