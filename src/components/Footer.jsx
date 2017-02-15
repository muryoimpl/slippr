import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as pageActions from '../actions/page'
import * as headerActions from '../actions/header'

class Footer extends React.Component {
  handleNextPage () {
    const { markdownPages, idx } = this.props

    if (idx < markdownPages.length - 1) {
      const nextIdx = idx + 1
      this.updatePageIndex(nextIdx)
    }
  }

  handlePrevPage () {
    const { idx } = this.props

    if (idx > 0) {
      const nextIdx = idx - 1
      this.updatePageIndex(nextIdx)
    }
  }

  updatePageIndex (idx) {
    const { store } = this.context

    const idxToNumber = Number(idx)
    store.dispatch(pageActions.updatePageIndex(idxToNumber))
  }

  handleNormalScreen (isFullScreen) {
    const { store, router } = this.context

    store.dispatch(headerActions.setFullScreen(isFullScreen))
    router.push({ pathname: '/' })
    ipcRenderer.send('normal-screen')
  }

  render () {
    const { markdownPages, idx, fullscreen } = this.props
    const disabledNextClass = idx === markdownPages.length - 1 ? 'c-btn__disabled' : ''
    const disabledPrevClass = idx === 0 ? 'c-btn__disabled' : ''

    return (
      <footer className={`toolbar toolbar-footer ${fullscreen ? 'c-footer-btn-group__hidden' : 'c-btn-group__disappear'}`}>
        <button className="c-footer-btn__show" onClick={(e) => this.handlePrevPage()} title="Previous page">
          <span className={`icon icon-left ${disabledPrevClass}`}></span>
        </button>

        <button className="c-footer-btn__center ma" onClick={e => this.handleNormalScreen(e)} title="Finish full screen">
          <span className="icon icon-down-bold"></span>
        </button>

        <button className="c-footer-btn__show pull-right" onClick={(e) => this.handleNextPage()} title="Next page">
          <span className={`icon icon-right ${disabledNextClass}`}></span>
        </button>
      </footer>
    )
  }
}

Footer.propTypes = {
  fullscreen: PropTypes.bool.isRequired,
  markdownPages: PropTypes.array,
  idx: PropTypes.number
}

Footer.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}

export default connect((state) => {
  return {
    markdownPages: state.pages.markdownPages,
    idx: state.pages.idx,
    fullscreen: state.headers.fullscreen
  }
})(Footer)
