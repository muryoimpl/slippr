import { connect } from 'react-redux';

import CodeStyleContent from './CodeStyle';
import { selectHighlightTheme } from './action';
import { set } from '../../utils/localStorage';

const mapStateToProps = state => ({
  selected: state.codeStyles.selected,
});
const mapDispatchToProps = dispatch => ({
  selectHighlightTheme: name => dispatch(selectHighlightTheme(name)),
  selectAndSaveHighlightTheme: (name) => {
    set('highlight', name);
    dispatch(selectHighlightTheme(name));
  },
});

const CodeStyle = connect(mapStateToProps, mapDispatchToProps)(CodeStyleContent);

export default CodeStyle;
