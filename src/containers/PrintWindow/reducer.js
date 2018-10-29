import Immutable from 'immutable';
import * as Types from './constant';

const initialState = new Immutable.Record({
  markdown: '',
  theme: '',
  highlight: '',
  ratio: 0,
})();

export default function prints(state = initialState, action) {
  switch (action.type) {
    case Types.DISPLAY_PRINT_PAGE:
      return state.merge({
        markdown: action.markdown,
        theme: action.theme,
        highlight: action.highlight,
        ratio: action.ratio,
      });
    default:
      return state;
  }
}
