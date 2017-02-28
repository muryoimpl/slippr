import React, { PropTypes } from 'react'

import * as Settings from '../constants/settings'

const ProgressBar = React.createClass({
  render () {
    const { progress } = this.props

    return (
      <progress className="p-progress-bar" max={Settings.MAXIMUM_PROGRESS} value={progress}></progress>
    )
  }
})

ProgressBar.propTypes = {
  progress: PropTypes.number
}

export default ProgressBar
