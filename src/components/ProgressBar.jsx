import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Settings from '../constants/settings'

class ProgressBar extends React.Component {
  render () {
    const { progress } = this.props

    return (
      <progress className="p-progress-bar" max={Settings.MAXIMUM_PROGRESS} value={progress}></progress>
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number
}

export default connect((state) => {
  return {
    progress: state.progressBar.value
  }
})(ProgressBar)
