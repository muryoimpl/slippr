import MarkdownIt from 'markdown-it'
import mdEmoji from 'markdown-it-emoji'
import hljs from 'highlight.js'

export function renderHtmlPreview (markdown) {
  const md = getMarkdownInstance()

  md.renderer.rules.hr = (tokens, index, options) => {
    options.idx += 1
    return `</div></div><div class="separator"></div><div data-index="${options.idx}" class="p-page-preview theBridge"><div class="p-page__inner">`
  }

  return md.render(`<div data-index="${md.options.idx}" class="p-page-preview theBridge"><div class="p-page__inner">\n\n${markdown || ''}</div></div>`)
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
  }).use(mdEmoji).set({ idx: 0 })
}
