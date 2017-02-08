import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as homeActions from '../actions/home'
import * as pageActions from '../actions/page'
import * as headerActions from '../actions/header'
import { renderHtmlPreview } from '../utils/markdownConverter'

class Home extends React.Component {
  handleTextaraChange (e) {
    const { store } = this.context

    store.dispatch(homeActions.editTextareaValue(e.target.value))
  }

  handlePreviewClick (e) {
    const { store, router } = this.context
    const idx = e.target.dataset.index

    store.dispatch(headerActions.setFullScreen(true))
    store.dispatch(pageActions.splitMarkdownAsPages(this.props.markdown))
    store.dispatch(pageActions.updatePageIndex(idx))

    router.push({ pathname: `/pages/${idx}` })
    ipcRenderer.send('full-screen')
  }

  render () {
    const { markdown } = this.props

    return (
      <div className="pane-group">
        <div className="pane">
          <form className="p-editor__pane">
            <div className="form-group p-editor__pane">
              <textarea className="form-control p-editor__textarea" rows="10" value={markdown} autoFocus="true" onChange={e => this.handleTextaraChange(e)}></textarea>
            </div>
          </form>
        </div>
        <div className="pane p-preview">
          <div dangerouslySetInnerHTML={{__html: renderHtmlPreview(markdown)}} />
          <button data-index id="pv" className="hidden" onClick={e => this.handlePreviewClick(e)}></button>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  markdown: PropTypes.string
}

Home.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.homes.markdown
  }
})(Home)
