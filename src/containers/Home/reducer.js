import Immutable from 'immutable';
import * as Types from '../../constants/actions';

const initialState = new Immutable.Record({
  fullscreen: false,
})();

export default function home(state = initialState, action) {
  switch (action.type) {
    case Types.SET_FULL_SCREEN:
      return state.merge({ fullscreen: action.fullscreen });
    default:
      return state;
  }
}
