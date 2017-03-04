import horsey from 'horsey'

import { emojiList } from '../constants/emojiConst'

export function registerEmojiSuggestion () {
  horsey(document.querySelector('textarea#markdown-textarea'), {
    source: [{
      list: emojiList
    }],
    getText: 'text',
    getValue: (source) => `:${source.text}:`,
    renderItem: function (li, suggestion) {
      const img = `<img class="p-editor__emoji-candidate" src="assets/images/emoji/${suggestion.text}.png" />`
      li.innerHTML = `${img}${suggestion.text}`
    },
    limit: 5,
    blankSearch: false,
    noMatches: null,
    anchor: ':',
    debouce: 5,
    cache: {
      duration: true
    }
  })
}
