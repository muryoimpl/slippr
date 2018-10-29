import { connect } from 'react-redux';

import Print from './Print';
import { displayPrintPage } from './action';

const mapStateToProps = state => ({
  markdown: state.prints.markdown,
  theme: state.prints.theme,
  ratio: state.prints.ratio,
  highlight: state.prints.highlight,
});

const mapDispatchToProps = dispatch => ({
  displayPrintPage: json => (dispatch(displayPrintPage(json.markdown, json.theme, json.ratio, json.highlight))),
});

const PrintWindow = connect(mapStateToProps, mapDispatchToProps)(Print);

export default PrintWindow;
