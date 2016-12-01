import MarkdownIt from 'markdown-it'
import mdEmoji from 'markdown-it-emoji'
import hljs from 'highlight.js'

export function renderHtml (markdown) {
  // TODO: markdown に「--」 への対応を入れる
  const md = new MarkdownIt({
    html: true,
    typographer: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
        } catch (__) {}
      }
      return ''
    }
  }).use(mdEmoji)

  return md.render(markdown || '')
}
