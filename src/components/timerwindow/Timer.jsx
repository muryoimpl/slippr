import React from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'
import PropTypes from 'prop-types'

import * as timerActions from '../../actions/timerwindow/timer'
import { zeroPad, calcTotalSeconds, convertTimeToNumber } from '../../utils/timeConverter'

class Timer extends React.Component {
  handleChangeValue (e) {
    const { store } = this.context
    store.dispatch(timerActions.changeValue(e.target.value))
  }

  handleTimerReset (e) {
    e.preventDefault()
    const { store } = this.context
    store.dispatch(timerActions.resetTimer())
    this.stopTimerInPage()
  }

  handleClearTimer (e) {
    e.preventDefault()
    const { store } = this.context
    store.dispatch(timerActions.clearTimer())
    this.stopTimerInPage()
  }

  handleTimerStart (e) {
    e.preventDefault()
    const { store } = this.context
    const { limit } = this.props

    if (convertTimeToNumber(limit).length === 3) {
      this.sendTotalSeconds()
      const intervalId = setInterval(() => this.tick(), 1000)
      store.dispatch(timerActions.startTimer(intervalId))
    }
  }

  handleTimerStop (e) {
    e.preventDefault()
    const { store } = this.context
    const { intervalId } = this.props

    this.stopTimerInPage()
    store.dispatch(timerActions.stopTimer(intervalId))
  }

  tick () {
    const { store } = this.context
    const { hours, minutes, seconds, intervalId, limit } = this.props

    if (hours === 0 && minutes === 0 && seconds === 0) {
      store.dispatch(timerActions.stopTimer(intervalId))
      store.dispatch(timerActions.startBlinkPage())

      setTimeout(() => {
        store.dispatch(timerActions.stopBlinkPage())
        store.dispatch(timerActions.changeValue(limit))
      }, 5000)
    } else {
      store.dispatch(timerActions.runTicker(hours, minutes, seconds))
    }
  }

  sendTotalSeconds () {
    const { hours, minutes, seconds } = this.props
    ipcRenderer.send('send-total-seconds', { totalSeconds: calcTotalSeconds(hours, minutes, seconds) })
  }

  stopTimerInPage () {
    ipcRenderer.send('stop-timer-in-page')
  }

  render () {
    const { limit, hours, minutes, seconds, started, blink } = this.props
    const isLimitInvalid = (convertTimeToNumber(limit).length !== 3)

    return (
      <div className={`p-timer ${blink ? 'p-timer__blink' : ''}`}>
        <div className="p-timer__display">
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </div>

        <form className="p-timer__time mgl">
          <div className="form-group">
            <span>Timer</span>
            <input
              type="time"
              id="limit"
              className="p-timer__input mgl mgt"
              value={limit}
              onChange={e => this.handleChangeValue(e)}
              autoFocus="true"
              disabled={started}
              step="1"
            />
            <button className="btn btn-default mgl" onClick={e => this.handleTimerReset(e)} disabled={started}>RESET</button>
            <button className="btn btn-default mgl" onClick={e => this.handleClearTimer(e)} disabled={started}>CLEAR</button>
            { !started &&
              <button className="btn btn-primary mgl p-timer__start" onClick={e => this.handleTimerStart(e)} disabled={isLimitInvalid}>START</button>
            }
            { started &&
              <button className="btn btn-negative mgl" onClick={e => this.handleTimerStop(e)}>STOP</button>
            }
          </div>
        </form>
      </div>
    )
  }
}

Timer.propTypes = {
  limit: PropTypes.string,
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  started: PropTypes.bool,
  intervalId: PropTypes.node,
  blink: PropTypes.bool
}

Timer.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    limit: state.timers.limit,
    hours: state.timers.hours,
    minutes: state.timers.minutes,
    seconds: state.timers.seconds,
    started: state.timers.started,
    intervalId: state.timers.intervalId,
    blink: state.timers.blink
  }
})(Timer)
