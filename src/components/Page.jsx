import React from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import PropTypes from 'prop-types'

import ProgressBar from './ProgressBar'
import { renderHtmlPage } from '../utils/markdownConverter'
import * as pageActions from '../actions/page'
import * as headerActions from '../actions/header'
import * as progressBarActions from '../actions/progressBar'
import * as keyCodeChecker from '../utils/keyCodeChecker'

class Page extends React.Component {
  constructor () {
    super()
    // こうしないと、this が event のコンテキストになる
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this)
  }

  componentDidMount () {
    this.updatePageIndex(this.props.match.params.idx)
    this.registerIpcEvents()
    document.addEventListener('keydown', this.handleOnKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleOnKeyDown)
  }

  registerIpcEvents () {
    ipcRenderer.on('transition-page', (_event, json) => {
      this.handleKeyAction(json.keyCode)
    })
  }

  handleOnKeyDown (event) {
    this.handleKeyAction(event.keyCode)
  }

  handleKeyAction (keyCode) {
    const { store } = this.context
    const { markdownPages, idx } = this.props

    if (keyCodeChecker.isNextPageKey(keyCode) && idx < markdownPages.length - 1) {
      const nextIdx = idx + 1
      this.transitionTo(nextIdx)
    }

    if (keyCodeChecker.isPrevPageKey(keyCode) && idx > 0) {
      const prevIdx = idx - 1
      this.transitionTo(prevIdx)
    }

    if (keyCodeChecker.isEscapeKey(keyCode)) {
      store.dispatch(pageActions.clearPages())
      store.dispatch(headerActions.setPlayScreen(false))
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
    router.history.push(`/pages/${nextIdx}`)
  }

  backToHome () {
    const { store, router } = this.context

    store.dispatch(headerActions.setFullScreen(false))
    router.history.push('/')
    ipcRenderer.send('normal-screen')
  }

  render () {
    const { markdownPages, idx, theme } = this.props

    return (
      <div className={`p-page ${theme}`} onKeyDown={(e) => this.handleOnKeyDown}>
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
  theme: PropTypes.string
}

Page.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.textareas.markdown,
    markdownPages: state.pages.markdownPages,
    idx: state.pages.idx,
    theme: state.themes.selected
  }
})(Page)
