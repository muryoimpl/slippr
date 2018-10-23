import { combineReducers } from 'redux';

import prints from './print';
import aspectRatio from '../../containers/AspectRatioSelector/reducer';
import codeStyles from '../../containers/CodeStyle/reducer';

const printReducer = combineReducers({
  prints,
  aspectRatio,
  codeStyles,
});

export default printReducer;
