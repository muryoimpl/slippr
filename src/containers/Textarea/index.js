import { connect } from 'react-redux';

import TextareaContent from './Textarea';
import { editTextareaValue } from './action';

const mapStateToProps = state => ({
  markdown: state.textarea.markdown,
});

const mapDispatchToProps = dispatch => ({
  editTextareaValue: previousValue => (dispatch(editTextareaValue(previousValue))),

});

const Textarea = connect(mapStateToProps, mapDispatchToProps)(TextareaContent);

export default Textarea;
