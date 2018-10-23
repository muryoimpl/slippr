import Immutable from 'immutable';
import * as Types from '../../constants/actions';

const initialState = new Immutable.Record({ selected: 'theBridge' })();

export default function themes(state = initialState, action) {
  switch (action.type) {
    case Types.SELECT_THEME:
      return state.merge({ selected: action.theme });
    default:
      return state;
  }
}
