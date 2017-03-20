import React, { PropTypes } from 'react'

import Print from './Print'

const PrintApp = React.createClass({
  render () {
    return (
      <div className="window">
        <div className="window-content">
          <Print />
        </div>
      </div>
    )
  }
})

PrintApp.propTypes = {
  children: PropTypes.object
}

export default PrintApp
