import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as headerActions from '../actions/header'
import * as homeActions from '../actions/home'

class Header extends React.Component {
  componentDidMount () {
    const { store } = this.context

    ipcRenderer.on('reply-file-dialog', (event, json) => {
      store.dispatch(homeActions.setMarkdownText(json.markdown))
      store.dispatch(headerActions.setFileName(json.filename))
    })
  }

  handleOpenFile () {
    ipcRenderer.send('show-file-dialog', '')
  }

  render () {
    return (
      <header className="toolbar toolbar-header">
        <h1 className="title">{ this.props.filename }</h1>

        <div className="toolbar-default">
          <button className="btn btn-default" onClick={(e) => this.handleOpenFile()}>
            <span className="icon icon-folder"></span>
            &nbsp;open
          </button>

          <button className="btn btn-default">
            <span className="icon icon-doc-text"></span>
            &nbsp;save
          </button>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  filename: PropTypes.string
}

Header.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    filename: state.headers.filename
  }
})(Header)
