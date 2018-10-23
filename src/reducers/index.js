import { combineReducers } from 'redux';

import themes from '../containers/ThemeSelector/reducer';
import home from '../containers/Home/reducer';
import pages from '../containers/Page/reducer';
import codeStyles from '../containers/CodeStyle/reducer';
import aspectRatio from '../containers/AspectRatioSelector/reducer';
import headers from '../containers/Header/reducer';
import progressBar from '../containers/ProgressBar/reducer';
import textarea from '../containers/Textarea/reducer';

const rootReducer = combineReducers({
  codeStyles,
  themes,
  home,
  pages,
  aspectRatio,
  headers,
  progressBar,
  textarea,
});

export default rootReducer;
