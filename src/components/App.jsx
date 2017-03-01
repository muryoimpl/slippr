import React, { PropTypes } from 'react'

import Header from './Header'
import Footer from './Footer'
import HighlightCssLink from './HighlightCssLink'
import DesignSelectors from './DesignSelectors'
import AspectStyle from './AspectStyle'

class App extends React.Component {
  render () {
    return (
      <div className="window">
        <Header />
        <DesignSelectors />
        <HighlightCssLink />
        <AspectStyle />
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
