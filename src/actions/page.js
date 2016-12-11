import * as Types from '../constants/pages'

export function splitMarkdownAsPages (text) {
  const splitMarkdown = text.split(/(?:\*|\-){3,}/)
  return { type: Types.SPLIT_MARKDOWN_AS_PAGES, markdownPages: splitMarkdown }
}
