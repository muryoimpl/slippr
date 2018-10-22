import * as Types from '../constants/actions';

export function setMarkdownText(text) {
  return { type: Types.SET_MARKDOWN_TEXT, markdown: text };
}

export function editTextareaValue(text) {
  return dispatch => Promise.resolve(
    dispatch({ type: Types.EDIT_TEXTAREA_VALUE, markdown: text }),
  );
}
