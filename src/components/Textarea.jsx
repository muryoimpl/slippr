import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import 'jquery-textcomplete'

import * as textareaActions from '../actions/textarea'
import * as storage from '../utils/localStorage'
import { emojiList } from '../constants/emojiConst'

class Textarea extends React.Component {
  componentDidMount () {
    const previousValue = storage.get('markdown')
    if (!document.querySelector('#markdown-textarea').value && previousValue) {
      this.context.store.dispatch(textareaActions.editTextareaValue(previousValue))
    }

    // emoji autocomplete
    $('#markdown-textarea').textcomplete([
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

  componentWillUnmount () {
    storage.set('markdown', this.props.markdown)
    $('ul.dropdown-menu.textcomplete-dropdown').remove()
  }

  handleTextaraChange (e) {
    const { store } = this.context

    store.dispatch(textareaActions.editTextareaValue(e.target.value))
  }

  // TODO: drag&drop 中に移動した位置に挿入されないのでなんとかしたい
  handleDropImage (e) {
    e.stopPropagation()
    e.preventDefault()

    const file = e.dataTransfer.files[0]
    if (file.type.match('image/')) {
      let tag
      if (e.currentTarget.selectionStart && e.currentTarget.selectionStart !== 0) {
        tag = `\n---\n${this.imgHTMLTag(file.path, file.name)}`
      } else {
        tag = `${this.imgHTMLTag(file.path, file.name)}`
      }

      const posStart = e.currentTarget.selectionStart
      const posEnd = e.currentTarget.selectionEnd

      let text = e.currentTarget.value
      e.currentTarget.value = `${text.substring(0, posStart)}\n${tag}\n${text.substring(posEnd, text.length)}`

      this.handleTextaraChange(e)
    }
  }

  imgHTMLTag (path, name) {
    return `<img src="file://${path}" height="100%" width="100%" alt="${name}">\n`
  }

  render () {
    const { markdown } = this.props

    return (
      <form className="p-editor__pane">
        <div className="form-group p-editor__pane">
          <textarea
            id="markdown-textarea"
            className="form-control p-editor__textarea"
            rows="10"
            value={markdown}
            autoFocus="true"
            onDrop={e => this.handleDropImage(e)}
            onChange={e => this.handleTextaraChange(e)}
          ></textarea>
        </div>
      </form>
    )
  }
}

Textarea.contextTypes = {
  store: PropTypes.object
}

Textarea.propTypes = {
  markdown: PropTypes.string
}

export default connect((state) => {
  return {
    markdown: state.textareas.markdown
  }
})(Textarea)
