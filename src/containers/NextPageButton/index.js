import { connect } from 'react-redux';

import NextPageButtonContent from './NextPageButton';
import { updatePageIndex } from '../Page/action';

const mapStateToProps = state => ({
  markdownPages: state.pages.markdownPages,
  idx: state.pages.idx || 0,
  fullscreen: state.pages.fullscreen,
});

const mapDispatchToProps = dispatch => ({
  updatePageIndex: idx => dispatch(updatePageIndex(Number(idx))),
});

const NextPageButton = connect(mapStateToProps, mapDispatchToProps)(NextPageButtonContent);

export default NextPageButton;
