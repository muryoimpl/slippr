import MarkdownIt from 'markdown-it'
import mdEmoji from 'markdown-it-emoji'

export function renderHtml (markdown) {
  const md = new MarkdownIt({
    html: true,
    typographer: true
  }).use(mdEmoji)

  return md.render(markdown || '')
}
