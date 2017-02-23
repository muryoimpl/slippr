import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import ProgressBar from './ProgressBar'
import { renderHtmlPage } from '../utils/markdownConverter'
import * as pageActions from '../actions/page'
import * as headerActions from '../actions/header'
import * as progressBarActions from '../actions/progressBar'
import * as keyCode from '../constants/keyCode'

class Page extends React.Component {
  constructor () {
    super()
    // こうしないと、this が event のコンテキストになる
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
  }

  componentDidMount () {
    const { store } = this.context

    this.updatePageIndex(this.props.params.idx)
    this.updateProgress(this.props.params.idx)
    document.addEventListener('keydown', this.handleOnKeyDown)

    ipcRenderer.on('blink-page', (_event) => {
      store.dispatch(pageActions.startBlinkPage())

      setTimeout(() => {
        store.dispatch(pageActions.stopBlinkPage())
      }, 5000)
    })
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  handleOnKeyDown (event) {
    const { markdownPages, idx } = this.props

    if (this.isNextPageKey(event.keyCode) && idx < markdownPages.length - 1) {
      const nextIdx = idx + 1
      this.updateProgress(nextIdx)
      this.transitionTo(nextIdx)
    }

    if (this.isPrevPageKey(event.keyCode) && idx > 0) {
      const prevIdx = idx - 1
      this.updateProgress(prevIdx)
      this.transitionTo(prevIdx)
    }

    if (event.keyCode === keyCode.ESCAPE) {
      const { store, router } = this.context
      store.dispatch(headerActions.setFullScreen(false))

      router.push({ pathname: '/' })
      ipcRenderer.send('normal-screen')
    }
  }

  updatePageIndex (idx) {
    const { store } = this.context

    store.dispatch(pageActions.updatePageIndex(Number(idx)))
  }

  updateProgress (idx) {
    const { store } = this.context
    const { markdownPages } = this.props

    store.dispatch(progressBarActions.updateProgress(Number(idx), markdownPages.length))
  }

  transitionTo (nextIdx) {
    const { router } = this.context

    this.updatePageIndex(nextIdx)
    return router.push({ pathname: `/pages/${nextIdx}` })
  }

  isNextPageKey (pressedKeyCode) {
    return pressedKeyCode === keyCode.RIGHT_ARROW || pressedKeyCode === keyCode.KEY_UP_ARROW
  }

  isPrevPageKey (pressedKeyCode) {
    return pressedKeyCode === keyCode.LEFT_ARROW || pressedKeyCode === keyCode.DOWN_ARROW
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
