import { connect } from 'react-redux';

import HeaderContent from './Header';
import { setMarkdownText } from '../Textarea/action';
import { setFileName } from './action';

const mapStateToProps = state => ({
  filename: state.headers.filename,
  markdown: state.textarea.markdown,
  fullscreen: state.pages.fullscreen,
});

const mapDispatchToProps = dispatch => ({
  setMarkdownText: text => (dispatch(setMarkdownText(text))),
  setFileName: name => (dispatch(setFileName(name))),
});

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderContent);

export default Header;
