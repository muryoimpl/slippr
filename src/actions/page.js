import * as Types from '../constants/actions'

export function splitMarkdownAsPages (text) {
  const splitMarkdown = text.split(/\n+(?:\*|-){3,}\n+/)
  return { type: Types.SPLIT_MARKDOWN_AS_PAGES, markdownPages: splitMarkdown }
}

export function updatePageIndex (idx) {
  return { type: Types.UPDATE_PAGE_INDEX, idx: idx }
}

export function clearPages () {
  return { type: Types.CLEAR_PAGES }
}
