import Immutable from 'immutable';
import * as Types from '../constants/actions';
import * as Settings from '../constants/settings';

const initialState = new Immutable.Record({ ratio: Settings.ASPECT_RATIO[0].value })();

export default function aspectRatio(state = initialState, action) {
  switch (action.type) {
    case Types.SELECT_RATIO:
      return state.merge({ ratio: Number(action.ratio) });
    default:
      return state;
  }
}
