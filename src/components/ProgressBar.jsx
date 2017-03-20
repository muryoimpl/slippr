import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as Settings from '../constants/settings'
import { calcTimeProgress } from '../utils/timeConverter'
import * as progressBarActions from '../actions/progressBar'

class ProgressBar extends React.Component {
  componentDidMount () {
    this.registerIpcEvents()
  }

  registerIpcEvents () {
    const { store } = this.context

    ipcRenderer.on('start-timer-in-page', (_event, json) => {
      store.dispatch(progressBarActions.setTotalSeconds(json.totalSeconds))
      const intervalId = setInterval(() => this.tick(), 1000)
      store.dispatch(progressBarActions.setElapsedIntervalId(intervalId))
    })

    ipcRenderer.on('stop-timer-in-page', (_event, json) => {
      store.dispatch(progressBarActions.stopElapsedTimeRunning(this.props.intervalId))
    })
  }

  tick () {
    const { store } = this.context
    const { totalSeconds, elapsedSeconds, intervalId } = this.props

    if (totalSeconds > elapsedSeconds) {
      store.dispatch(progressBarActions.updateElapsedSeconds(elapsedSeconds))
    }

    if (totalSeconds !== 0 && totalSeconds === elapsedSeconds) {
      store.dispatch(progressBarActions.stopElapsedTimeRunning(intervalId))
    }
  }

  render () {
    const { progress, elapsedSeconds, totalSeconds, showIcons } = this.props

    return (
      <div className="p-proggress-area">
        { totalSeconds !== 0 && showIcons &&
          <span className="p-progress-icon-area" style={{width: `${progress}%`}}><img src="assets/images/emoji/koko.png" className="p-progress-icon" /></span>
        }
        { totalSeconds !== 0 && showIcons &&
          <span className="p-progress-icon-area" style={{width: `${calcTimeProgress(elapsedSeconds, totalSeconds)}%`}}><img src="assets/images/emoji/hourglass_flowing_sand.png" className="p-progress-icon" /></span>
        }
        <progress className="p-progress-bar" max={Settings.MAXIMUM_PROGRESS} value={progress}></progress>
      </div>
    )
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
  elapsedSeconds: PropTypes.number,
  totalSeconds: PropTypes.number,
  intervalId: PropTypes.node,
  showIcons: PropTypes.bool
}

ProgressBar.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    progress: state.progressBar.progress,
    elapsedSeconds: state.progressBar.elapsedSeconds,
    totalSeconds: state.progressBar.totalSeconds,
    intervalId: state.progressBar.intervalId,
    showIcons: state.progressBar.showIcons
  }
})(ProgressBar)
