import $ from 'jquery'
import 'jquery-textcomplete'

import { emojiList } from '../constants/emojiConst'

export function registerEmojiAutoComplete (selector) {
  $(selector).textcomplete([
    {
      match: /\B:([-+\w]*)$/,
      search: (term, callback) => {
        callback($.map(emojiList, (emoji) => {
          return emoji.text.indexOf(term) === 0 ? emoji.text : null
        }))
      },
      template: (emojiName) => {
        return `<img class="p-editor__emoji-candidate" src="assets/images/emoji/${emojiName}.png" /> ${emojiName}`
      },
      replace: (emojiName) => {
        return `:${emojiName}: `
      },
      index: 1
    }
  ])
}

export function removeEmojiAutoComplete (selector) {
  $(selector).remove()
}
