import Immutable from 'immutable';
import * as Types from '../../constants/actions';

const initialState = new Immutable.Record({
  filename: '',
})();

export default function headers(state = initialState, action) {
  switch (action.type) {
    case Types.SET_FILE_NAME:
      return state.merge({ filename: action.filename });
    case Types.SHOW_DEFAULT:
    default:
      return state;
  }
}
