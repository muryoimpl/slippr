import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as headerActions from '../actions/header'
import * as textareaActions from '../actions/textarea'
import PageButtons from '../components/PageButtons'
import * as styleHandler from '../utils/styleHandler'

class Header extends React.Component {
  componentDidMount () {
    const { store } = this.context

    ipcRenderer.on('reply-file-dialog', (event, json) => {
      store.dispatch(textareaActions.setMarkdownText(json.markdown))
      store.dispatch(headerActions.setFileName(json.filename))
    })

    ipcRenderer.on('reply-save-dialog', (event, json) => {
      store.dispatch(headerActions.setFileName(json.filename))
    })

    ipcRenderer.on('reply-overwrite-file', (event, json) => {
      console.log('hi')
      const dom = document.getElementById('saved')
      dom.classList.remove('hidden')
      dom.classList.add('c-btn__saved')
      setTimeout(() => {
        dom.classList.add('hidden')
        dom.classList.remove('c-btn__saved')
      }, 3000)
    })
  }

  handleOpenFile () {
    ipcRenderer.send('show-file-dialog', '')
  }

  handleSaveFileAs () {
    ipcRenderer.send('save-file-dialog', { markdown: this.props.markdown })
  }

  handleOverwriteFileAs () {
    ipcRenderer.send('overwrite-file', { markdown: this.props.markdown, filename: this.props.filename })
  }

  render () {
    const existMarkdown = !!this.props.markdown
    const btnStyle = styleHandler.buttonDisabledStyle(existMarkdown)
    const existFilename = !!this.props.filename
    const overwriteBtnStyle = styleHandler.buttonDisabledStyle(existFilename)

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

          <button className={classNames(overwriteBtnStyle)} onClick={(e) => this.handleOverwriteFileAs()} disabled={!existFilename}>
            <span className="icon icon-doc-text mgr"></span>
            overwrite
          </button>

          <span id="saved" className="mgl hidden">Saved!!</span>

          <PageButtons
            existMarkdown={!!existMarkdown}
            markdown={this.props.markdown}
            showIcons={this.props.showIcons}
            theme={this.props.theme}
            ratio={this.props.ratio}
            highlight={this.props.highlight}
          />
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  filename: PropTypes.string,
  markdown: PropTypes.string,
  fullscreen: PropTypes.bool.isRequired,
  showIcons: PropTypes.bool.isRequired,
  theme: PropTypes.string,
  ratio: PropTypes.number,
  highlight: PropTypes.string
}

Header.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}

export default connect((state) => {
  return {
    filename: state.headers.filename,
    markdown: state.textareas.markdown,
    fullscreen: state.headers.fullscreen,
    showIcons: state.progressBar.showIcons,
    theme: state.themes.selected,
    ratio: state.aspectRatio.ratio,
    highlight: state.codeStyles.selected
  }
})(Header)
