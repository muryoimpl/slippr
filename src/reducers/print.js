import { combineReducers } from 'redux';

import prints from '../containers/PrintWindow/reducer';

const printReducer = combineReducers({
  prints,
});

export default printReducer;
