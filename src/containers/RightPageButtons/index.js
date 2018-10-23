import { connect } from 'react-redux';

import PageButtonsContent from './PageButtons';
import { toggleIcons } from '../ProgressBar/action';
import { setPlayScreen, setFullScreen } from '../Page/action';

const mapStateToProps = state => ({
  filename: state.headers.filename,
  markdown: state.textarea.markdown,
  fullscreen: state.pages.fullscreen,
  playscreen: state.pages.playscreen,
  showIcons: state.progressBar.showIcons,
  theme: state.themes.selected,
  ratio: state.aspectRatio.ratio,
  highlight: state.codeStyles.selected,
});

const mapDispatchToProps = dispatch => ({
  toggleIcons: toShow => (dispatch(toggleIcons(toShow))),
  setPlayScreen: bool => (dispatch(setPlayScreen(bool))),
  setFullScreen: bool => (dispatch(setFullScreen(bool))),
});

const RightPageButtons = connect(mapStateToProps, mapDispatchToProps)(PageButtonsContent);

export default RightPageButtons;
