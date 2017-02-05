import MarkdownIt from 'markdown-it'
import mdEmoji from 'markdown-it-emoji'
import hljs from 'highlight.js'

export function renderHtmlPreview (markdown) {
  const md = getMarkdownInstance()

  md.renderer.rules.hr = (tokens, index, options) => {
    return `</div></div><div class="separator"></div><div class="p-page-preview theBridge"><div class="p-page__inner">`
  }

  return md.render(`<div class="p-page-preview theBridge"><div class="p-page__inner">\n\n${markdown || ''}</div></div>`)
}

export function renderHtmlPage (markdown) {
  const md = getMarkdownInstance()

  return md.render(markdown)
}

function getMarkdownInstance () {
  return new MarkdownIt({
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
}
