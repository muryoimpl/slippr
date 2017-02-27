import React, { PropTypes } from 'react'

import * as Settings from '../constants/settings'

const ProgressBar = React.createClass({
  render () {
    return (
      <progress className="p-progress-bar" max={Settings.MAXIMUM_PROGRESS} value={this.props.progress}></progress>
    )
  }
})

ProgressBar.propTypes = {
  progress: PropTypes.number
}

export default ProgressBar
