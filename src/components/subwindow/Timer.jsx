import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { ipcRenderer } from 'electron'

import * as timerActions from '../../actions/subwindow/timer'
import { zeroPad } from '../../utils/timeConverter'

class Timer extends React.Component {
  handleChangeValue (e) {
    this.context.store.dispatch(timerActions.changeValue(e.target.value))
  }

  handleTimerReset (e) {
    e.preventDefault()

    this.context.store.dispatch(timerActions.resetTimer())
  }

  handleTimerStart (e) {
    e.preventDefault()

    if (this.props.limit.split(':').length === 3) {
      const intervalId = setInterval(() => this.tick(), 1000)
      this.context.store.dispatch(timerActions.startTimer(intervalId))
    }
  }

  handleTimerStop (e) {
    e.preventDefault()

    this.context.store.dispatch(timerActions.stopTimer(this.props.intervalId))
  }

  tick () {
    const { store } = this.context
    const { hours, minutes, seconds, intervalId } = this.props

    if (hours === 0 && minutes === 0 && seconds === 0) {
      store.dispatch(timerActions.stopTimer(intervalId))
      this.notifyTimeIsUp()
    } else {
      store.dispatch(timerActions.runTicker(hours, minutes, seconds))
    }
  }

  notifyTimeIsUp () {
    ipcRenderer.send('alert-time-limit')
  }

  render () {
    const { limit, hours, minutes, seconds, started } = this.props

    const isLimitInvalid = limit.split(':').length !== 3

    return (
      <div className="p-timer">
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
              ref="limit"
              step="1"
            />
            <button className="btn btn-default mgl" onClick={e => this.handleTimerReset(e)} disabled={started}>RESET</button>
            { !started &&
              <button className="btn btn-primary mgl p-timer__start" onClick={e => this.handleTimerStart(e)}>START</button>
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
  intervalId: PropTypes.node
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
    intervalId: state.timers.intervalId
  }
})(Timer)
