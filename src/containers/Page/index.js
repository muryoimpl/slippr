import { connect } from 'react-redux';

import PageContent from './Page';
import {
  updatePageIndex,
  updateProgress,
  clearPages,
  setPlayScreen,
  setFullScreen,
  splitMarkdownAsPages,
} from './action';

const mapStateToProps = state => ({
  markdown: state.textarea.markdown,
  markdownPages: state.pages.markdownPages,
  selectedTheme: state.themes.selected,
  idx: state.pages.idx,
});

const mapDispatchToProps = dispatch => ({
  updatePageIndex: idx => dispatch(updatePageIndex(idx)),
  updateProgress: (progress, totalSize) => dispatch(updateProgress(progress, totalSize)),
  clearPages: () => dispatch(clearPages()),
  setPlayScreen: bool => dispatch(setPlayScreen(bool)),
  setFullScreen: bool => dispatch(setFullScreen(bool)),
  splitMarkdownAsPages: markdown => dispatch(splitMarkdownAsPages(markdown)),
});

const Page = connect(mapStateToProps, mapDispatchToProps)(PageContent);

export default Page;
