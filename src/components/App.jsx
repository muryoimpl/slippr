import React, { PropTypes } from 'react'

class App extends React.Component {
  render () {
    return (
      <div className="window">
        <div className="window-content">
          { this.props.children }
        </div>
      </div>
    )
  }
}

App.propType = {
  children: PropTypes.object
}

export default App
