import * as Types from '../constants/home'

export function setMarkdownText (text) {
  return { type: Types.SET_MARKDOWN_TEXT, markdown: text }
}
