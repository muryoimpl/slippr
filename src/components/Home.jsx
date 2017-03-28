import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import Textarea from './Textarea'
import * as pageActions from '../actions/page'
import * as headerActions from '../actions/header'
import { renderHtmlPreview } from '../utils/markdownConverter'

class Home extends React.Component {
  componentDidMount () {
    const dom = document.querySelector('.pane.p-preview')
    dom.addEventListener('drop', this.disableEvent)
    dom.addEventListener('dragover', this.disableEvent)
  }

  componentWillUnmount (e) {
    const dom = document.querySelector('.pane.p-preview')
    dom.removeEventListener('drop', this.disableEvent)
    dom.removeEventListener('dragover', this.disableEvent)
  }

  disableEvent (e) {
    e.preventDefault()
    return false
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

  render () {
    const { markdown, selected } = this.props

    return (
      <div className="pane-group">
        <div className="pane">
          <Textarea />
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
    markdown: state.textareas.markdown,
    selected: state.themes.selected
  }
})(Home)
