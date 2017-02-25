import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import ProgressBar from './ProgressBar'
import { renderHtmlPage } from '../utils/markdownConverter'
import * as pageActions from '../actions/page'
import * as headerActions from '../actions/header'
import * as progressBarActions from '../actions/progressBar'
import * as keyCodeConst from '../constants/keyCode'

class Page extends React.Component {
  constructor () {
    super()
    // こうしないと、this が event のコンテキストになる
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
  }

  componentDidMount () {
    this.updatePageIndex(this.props.params.idx)
    this.registerIpcEvents()
    document.addEventListener('keydown', this.handleOnKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  registerIpcEvents () {
    const { store } = this.context

    ipcRenderer.on('blink-page', (_event) => {
      store.dispatch(pageActions.startBlinkPage())

      setTimeout(() => {
        store.dispatch(pageActions.stopBlinkPage())
      }, 5000)
    })
  }

  handleOnKeyDown (event) {
    this.handleKeyAction(event.keyCode)
  }

  handleKeyAction (keyCode) {
    const { markdownPages, idx } = this.props

    if (this.isNextPageKey(keyCode) && idx < markdownPages.length - 1) {
      const nextIdx = idx + 1
      this.transitionTo(nextIdx)
    }

    if (this.isPrevPageKey(keyCode) && idx > 0) {
      const prevIdx = idx - 1
      this.transitionTo(prevIdx)
    }

    if (keyCode === keyCodeConst.ESCAPE) {
      this.backToHome()
    }
  }

  updatePageIndex (idx) {
    const { store } = this.context
    const { markdownPages } = this.props

    store.dispatch(pageActions.updatePageIndex(Number(idx)))
    store.dispatch(progressBarActions.updateProgress(Number(idx), markdownPages.length))
  }

  transitionTo (nextIdx) {
    const { router } = this.context

    this.updatePageIndex(nextIdx)
    return router.push({ pathname: `/pages/${nextIdx}` })
  }

  isNextPageKey (keyCode) {
    return keyCode === keyCodeConst.RIGHT_ARROW || keyCode === keyCodeConst.DOWN_ARROW
  }

  isPrevPageKey (keyCode) {
    return keyCode === keyCodeConst.LEFT_ARROW || keyCode === keyCodeConst.UP_ARROW
  }

  backToHome () {
    const { store, router } = this.context

    store.dispatch(headerActions.setFullScreen(false))
    router.push({ pathname: '/' })
    ipcRenderer.send('normal-screen')
  }

  render () {
    const { markdownPages, idx, theme, blink } = this.props

    return (
      <div className={`p-page ${theme} ${blink ? 'p-page__blink' : ''}`} onKeyDown={(e) => this.handleOnKeyDown}>
        <div className="p-page__inner" dangerouslySetInnerHTML={ {__html: renderHtmlPage(markdownPages[idx])} } />
        <ProgressBar />
      </div>
    )
  }
}

Page.propTypes = {
  markdown: PropTypes.string,
  markdownPages: PropTypes.array,
  idx: PropTypes.number,
  theme: PropTypes.string,
  blink: PropTypes.bool
}

Page.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.homes.markdown,
    markdownPages: state.pages.markdownPages,
    idx: state.pages.idx,
    theme: state.themes.selected,
    blink: state.pages.blink
  }
})(Page)
