import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as headerActions from '../actions/header'
import * as homeActions from '../actions/home'
import * as pageActions from '../actions/page'
import Theme from './Theme'
import CodeStyle from './CodeStyle'

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
    const { store } = this.context

    store.dispatch(headerActions.setFullScreen(isFullScreen))

    const eventName = isFullScreen ? 'full-screen' : 'normal-screen'
    if (eventName === 'full-screen') {
      store.dispatch(pageActions.splitMarkdownAsPages(this.props.markdown))
    }

    this.transitionTo(eventName)
    ipcRenderer.send(eventName)
  }

  transitionTo (screentype) {
    const { router } = this.context

    switch (screentype) {
      case 'full-screen':
        return router.push({ pathname: '/pages/0' })
      case 'normal-screen':
        return router.push({ pathname: '/' })
    }
  }

  render () {
    const existMarkdown = !!this.props.markdown
    // TODO: highlight.js の style の選択をしたい
    // TODO: スライド自体のthemeも選択したい

    const btnStyle = {
      'btn': true,
      'btn-default': true,
      'c-btn__disabled': !existMarkdown
    }

    return (
      <header className={`toolbar toolbar-header ${this.props.fullscreen ? 'c-btn-group__hidden' : 'c-btn-group__show'}`}>
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

          <Theme />
          <CodeStyle />

          { this.props.fullscreen &&
            <button className="btn btn-default pull-right" onClick={(e) => this.handleFullScreen(false)}>
              <span className="icon icon-resize-small"></span>
            </button>
          }
          { !this.props.fullscreen &&
            <button className="btn btn-default pull-right" onClick={(e) => this.handleFullScreen(true)}>
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
