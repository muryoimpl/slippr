import MarkdownIt from 'markdown-it'
import mdEmoji from 'markdown-it-emoji'
import hljs from 'highlight.js'

export function renderHtml (markdown) {
  const md = new MarkdownIt({
    html: true,
    typographer: true,
    linkify: true,
    highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`
        } catch (__) {
          console.log('render error')
        }
      }
      return ''
    }
  }).use(mdEmoji)

  // NOTE: 「---」 で 1 ページとして区切られる
  md.renderer.rules.hr = (tokens, index, options) => {
    return `</div></div><div class="separator"></div><div class="p-page theBridge"><div class="p-page__inner">`
  }

  return md.render(`<div class="p-page theBridge"><div class="p-page__inner">\n\n${markdown || ''}</div></div>`)
}
