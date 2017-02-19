import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as headerActions from '../actions/header'
import * as homeActions from '../actions/home'
import * as pageActions from '../actions/page'

class Header extends React.Component {
  componentDidMount () {
    const { store } = this.context

    ipcRenderer.on('reply-file-dialog', (event, json) => {
      store.dispatch(homeActions.setMarkdownText(json.markdown))
      store.dispatch(headerActions.setFileName(json.filename))
    })

    ipcRenderer.on('reply-save-dialog', (event, json) => {
      store.dispatch(headerActions.setFileName(json.filename))
    })
  }

  handleOpenFile () {
    ipcRenderer.send('show-file-dialog', '')
  }

  handleSaveFileAs () {
    ipcRenderer.send('save-file-dialog', { markdown: this.props.markdown })
  }

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

  render () {
    const existMarkdown = !!this.props.markdown
    const btnStyle = {
      'btn': true,
      'btn-default': true,
      'c-btn__disabled': !existMarkdown
    }

    return (
      <header className={`toolbar toolbar-header ${this.props.fullscreen ? 'hidden' : 'c-btn-group__show'}`}>
        <h1 className="title">
          { !this.props.fullscreen && this.props.filename }
        </h1>

        <div className="toolbar-default">
          <button className="btn btn-default" onClick={(e) => this.handleOpenFile()}>
            <span className="icon icon-folder mgr"></span>
            open
          </button>

          <button className={classNames(btnStyle)} onClick={(e) => this.handleSaveFileAs()} disabled={!existMarkdown}>
            <span className="icon icon-doc-text mgr"></span>
            save as
          </button>

          { this.props.fullscreen &&
            <button className="btn btn-default pull-right" onClick={(e) => this.handleFullScreen(false)}>
              <span className="icon icon-resize-small"></span>
            </button>
          }
          { !this.props.fullscreen &&
            <button className={`${classNames(btnStyle)} pull-right`} onClick={(e) => this.handleFullScreen(true)} disabled={!existMarkdown}>
              <span className="icon icon-resize-full"></span>
            </button>
          }
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  filename: PropTypes.string,
  markdown: PropTypes.string,
  fullscreen: PropTypes.bool.isRequired
}

Header.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}

export default connect((state) => {
  return {
    filename: state.headers.filename,
    markdown: state.homes.markdown,
    fullscreen: state.headers.fullscreen
  }
})(Header)
