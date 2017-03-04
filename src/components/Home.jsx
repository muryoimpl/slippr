import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import horsey from 'horsey'

import * as homeActions from '../actions/home'
import * as pageActions from '../actions/page'
import * as headerActions from '../actions/header'
import { renderHtmlPreview } from '../utils/markdownConverter'
import { emojiList } from '../constants/emojiConst'

class Home extends React.Component {
  componentDidMount () {
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
      debouce: 20,
      cache: {
        duration: true
      }
    })
  }

  handleTextaraChange (e) {
    const { store } = this.context

    store.dispatch(homeActions.editTextareaValue(e.target.value))
  }

  handlePreviewClick (e) {
    const { store, router } = this.context
    const idx = e.target.dataset.index

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
