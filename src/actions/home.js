import * as Types from '../constants/actions'

export function setMarkdownText (text) {
  return { type: Types.SET_MARKDOWN_TEXT, markdown: text }
}

export function editTextareaValue (text) {
  return { type: Types.EDIT_TEXTAREA_VALUE, markdown: text }
}
