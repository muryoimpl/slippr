import React, { PropTypes } from 'react'

import * as Settings from '../constants/settings'

const ProgressBar = React.createClass({
  render () {
    const { progress } = this.props

    return (
      <div className="p-proggress-area">
        <span className="p-progress-icon-area" style={{width: `${progress}%`}}><img src="assets/images/emoji/koko.png" className="p-progress-icon" /></span>
        <progress className="p-progress-bar" max={Settings.MAXIMUM_PROGRESS} value={progress}></progress>
      </div>
    )
  }
})

ProgressBar.propTypes = {
  progress: PropTypes.number
}

export default ProgressBar
