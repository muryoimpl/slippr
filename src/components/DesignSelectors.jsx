import React from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import PropTypes from 'prop-types'

import * as headerActions from '../actions/header'
import * as pageActions from '../actions/page'
import Theme from './Theme'
import CodeStyle from './CodeStyle'
import AspectRatio from './AspectRatio'

class DesignSelectors extends React.Component {
  handleFullScreen (isFullScreen) {
    const { store, router } = this.context
    const { markdown } = this.props

    store.dispatch(headerActions.setFullScreen(isFullScreen))

    if (isFullScreen) {
      store.dispatch(pageActions.splitMarkdownAsPages(markdown))

      router.history.push('/pages/0')
      ipcRenderer.send('full-screen')
    } else {
      router.history.push('/')
      ipcRenderer.send('normal-screen')
    }
  }

  render () {
    const { fullscreen } = this.props

    return (
      <header className={`toolbar toolbar-header ${fullscreen ? 'hidden' : 'c-btn-group__show'}`}>
        <div className="toolbar-default">
          <span className="mgl">aspect ratio</span><AspectRatio />
          <span className="mgl">theme:</span><Theme />
          <span className="mgl">highlight:</span><CodeStyle />
        </div>
      </header>
    )
  }
}

DesignSelectors.propTypes = {
  markdown: PropTypes.string,
  fullscreen: PropTypes.bool.isRequired
}

DesignSelectors.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
}

export default connect((state) => {
  return {
    markdown: state.textareas.markdown,
    fullscreen: state.headers.fullscreen
  }
})(DesignSelectors)
