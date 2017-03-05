import * as Types from '../constants/actions'

export function splitMarkdownAsPages (text) {
  const splitMarkdown = text.split(/(?:\*|-){3,}/)
  return { type: Types.SPLIT_MARKDOWN_AS_PAGES, markdownPages: splitMarkdown }
}

export function updatePageIndex (idx) {
  return { type: Types.UPDATE_PAGE_INDEX, idx: idx }
}

export function startBlinkPage () {
  return { type: Types.START_BLINK_PAGE }
}

export function stopBlinkPage () {
  return { type: Types.STOP_BLINK_PAGE }
}
