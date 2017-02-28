import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as headerActions from '../actions/header'
import * as pageActions from '../actions/page'
import Theme from './Theme'
import CodeStyle from './CodeStyle'

class DesignSelectors extends React.Component {
  handleFullScreen (isFullScreen) {
    const { store, router } = this.context
    const { markdown } = this.props

    store.dispatch(headerActions.setFullScreen(isFullScreen))

    if (isFullScreen) {
      store.dispatch(pageActions.splitMarkdownAsPages(markdown))

      router.push({ pathname: '/pages/0' })
      ipcRenderer.send('full-screen')
    } else {
      router.push({ pathname: '/' })
      ipcRenderer.send('normal-screen')
    }
  }

  render () {
    const { fullscreen } = this.props

    return (
      <header className={`toolbar toolbar-header ${fullscreen ? 'hidden' : 'c-btn-group__show'}`}>
        <div className="toolbar-default">
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
    markdown: state.homes.markdown,
    fullscreen: state.headers.fullscreen
  }
})(DesignSelectors)
