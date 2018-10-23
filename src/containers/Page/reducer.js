import Immutable from 'immutable';
import * as Types from '../../constants/actions';

const initialState = new Immutable.Record({
  idx: 0,
  progress: 0,
  markdownPages: [''],
  playscreen: false,
  fullscreen: false,
})();

export default function pages(state = initialState, action) {
  switch (action.type) {
    case Types.SPLIT_MARKDOWN_AS_PAGES:
      return state.set('markdownPages', action.markdownPages);
    case Types.UPDATE_PAGE_INDEX:
      return state.merge({ idx: action.idx });
    case Types.UPDATE_PROGRESS: {
      const progress = 100 / (action.size - 1) * action.index;
      return state.merge({ progress });
    }
    case Types.CLEAR_PAGES:
      state.set('markdownPages', ['']);
      return state.set('idx', 0);
    case Types.SET_PLAY_SCREEN:
      return state.merge({ playscreen: action.playscreen });
    case Types.SET_FULL_SCREEN:
      return state.merge({ fullscreen: action.fullscreen });
    default:
      return state;
  }
}
