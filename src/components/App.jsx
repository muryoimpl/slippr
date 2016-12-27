import React, { PropTypes } from 'react'

import Header from './Header'
import Footer from './Footer'

class App extends React.Component {
  render () {
    return (
      <div className="window">
        <Header />
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
