import horsey from 'horsey'

import { emojiList } from '../constants/emojiConst'

export function registerEmojiSuggestion () {
  horsey(document.querySelector('textarea#markdown-textarea'), {
    source: [{
      list: emojiList
    }],
    getText: 'text',
    getValue: (s) => `:${s.text}:`,
    renderItem: function (li, suggestion) {
      const img = `<img class="p-editor__emoji-candidate" src="assets/images/emoji/${suggestion.text}.png" />`
      li.innerHTML = `${img}${suggestion.text}`
    },
    limit: 5,
    blankSearch: false,
    noMatches: null,
    anchor: ':',
    debouce: 10,
    cache: {
      duration: true
    }
  })
}
