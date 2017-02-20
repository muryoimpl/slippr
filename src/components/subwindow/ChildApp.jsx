import React, { PropTypes } from 'react'

import Timer from './Timer'

class ChildApp extends React.Component {
  render () {
    return (
      <div className="window p-timer">
        <header className="toolbar toolbar-header"></header>

        <div className="window-content">
          <Timer />
        </div>

        <footer className="toolbar toolbar-footer"></footer>
      </div>
    )
  }
}

ChildApp.propType = {
  children: PropTypes.object
}

export default ChildApp
