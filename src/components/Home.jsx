import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as textareaActions from '../actions/textarea'
import * as pageActions from '../actions/page'
import * as headerActions from '../actions/header'
import { renderHtmlPreview } from '../utils/markdownConverter'
import { registerEmojiSuggestion } from '../utils/emojiSuggestion'
import * as storage from '../utils/localStorage'

class Home extends React.Component {
  componentDidMount () {
    if (!document.querySelector('.sey-container')) {
      registerEmojiSuggestion()
    }

    const dom = document.querySelector('.pane.p-preview')
    dom.addEventListener('drop', this.disableEvent)
    dom.addEventListener('dragover', this.disableEvent)

    const previousValue = storage.get('markdown')
    if (!document.querySelector('#markdown-textarea').value && previousValue) {
      this.context.store.dispatch(textareaActions.editTextareaValue(previousValue))
    }
  }

  componentWillUnmount (e) {
    const dom = document.querySelector('.pane.p-preview')
    dom.removeEventListener('drop', this.disableEvent)
    dom.removeEventListener('dragover', this.disableEvent)

    storage.set('markdown', this.props.markdown)
  }

  disableEvent (e) {
    e.preventDefault()
    return false
  }

  handleTextaraChange (e) {
    const { store } = this.context

    store.dispatch(textareaActions.editTextareaValue(e.target.value))
  }

  handlePreviewClick (e) {
    const { store, router } = this.context
    const idx = e.target.dataset.index

    if (!this.props.markdown) {
      return false
    }

    store.dispatch(headerActions.setFullScreen(true))
    store.dispatch(pageActions.splitMarkdownAsPages(this.props.markdown))

    router.push({ pathname: `/pages/${idx}` })
    ipcRenderer.send('full-screen')
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
    const { markdown, selected } = this.props

    return (
      <div className="pane-group">
        <div className="pane">
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
        </div>
        <div className="pane p-preview">
          <div dangerouslySetInnerHTML={{__html: renderHtmlPreview(markdown, selected)}} />
          <button data-index id="pv" className="hidden" onClick={e => this.handlePreviewClick(e)}></button>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  markdown: PropTypes.string,
  selected: PropTypes.string
}

Home.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.homes.markdown,
    selected: state.themes.selected
  }
})(Home)
