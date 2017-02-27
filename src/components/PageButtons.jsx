import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { ipcRenderer } from 'electron'

import * as headerActions from '../actions/header'
import * as pageActions from '../actions/page'

export default class PageButtons extends React.Component {
  handleFullScreen (isFullScreen) {
    const { store, router } = this.context

    store.dispatch(headerActions.setFullScreen(isFullScreen))

    if (isFullScreen) {
      store.dispatch(pageActions.splitMarkdownAsPages(this.props.markdown))

      router.push({ pathname: '/pages/0' })
      ipcRenderer.send('full-screen')
    } else {
      router.push({ pathname: '/' })
      ipcRenderer.send('normal-screen')
    }
  }

  handleOpenChildWindow (e) {
    ipcRenderer.send('open-child-window')
  }

  render () {
    const { existMarkdown } = this.props
    const btnStyle = {
      'btn': true,
      'btn-default': true,
      'c-btn__disabled': !existMarkdown
    }

    return (
      <div className="pull-right">
        <button className={`${classNames(btnStyle)} mgr-one-btn`} onClick={(e) => this.handleOpenChildWindow(e)} title="Open timer" disabled={!existMarkdown}>
          <span className="icon icon-clock mgr"></span>
          open timer
        </button>

        { this.props.fullscreen &&
          <button className="btn btn-default" onClick={(e) => this.handleFullScreen(false)} title="Normal screen">
            <span className="icon icon-resize-small"></span>
          </button>
        }
        { !this.props.fullscreen &&
          <button className={`${classNames(btnStyle)}`} onClick={(e) => this.handleFullScreen(true)} disabled={!existMarkdown} title="Full screen">
            <span className="icon icon-resize-full"></span>
          </button>
        }
      </div>
    )
  }
}

PageButtons.propTypes = {
  existMarkdown: PropTypes.bool,
  markdown: PropTypes.string
}

PageButtons.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}
