import React, { PropTypes } from 'react'

import Header from './Header'
import Footer from './Footer'
import HighlightCssLink from './HighlightCssLink'

class App extends React.Component {
  render () {
    return (
      <div className="window">
        <Header />
        <HighlightCssLink />
        <div className="window-content">
          { this.props.children }
        </div>
        <Footer />
      </div>
    )
  }
}

App.propType = {
  children: PropTypes.object
}

export default App
