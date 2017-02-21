import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as timerActions from '../../actions/subwindow/timer'
import { zeroPad } from '../../utils/timeConverter'

class Timer extends React.Component {
  handleChangeValue (e) {
    const { store } = this.context

    store.dispatch(timerActions.changeValue(e.target.value))
  }

  handleTimerReset (e) {
    const { store } = this.context
    e.preventDefault()

    store.dispatch(timerActions.resetTimer())
  }

  handleTimerStart (e) {
    const { store } = this.context
    e.preventDefault()

    store.dispatch(timerActions.startTimer(e.target.value))
  }

  handleTimerStop (e) {
    const { store } = this.context
    e.preventDefault()

    store.dispatch(timerActions.stopTimer())
  }

  render () {
    const { limit, minutes, seconds } = this.props

    return (
      <div className="p-timer">
        <div className="p-timer__display">
          {zeroPad(minutes)}:{zeroPad(seconds)}
        </div>

        <form className="p-timer__time mgl">
          <div className="form-group">
            <span>Timer</span>
            <input type="time" id="limit" className="p-timer__input mgl mgt" value={limit} onChange={e => this.handleChangeValue(e)} autoFocus="true" />
            <button className="btn btn-default mgl" onClick={e => this.handleTimerReset(e)}>RESET</button>
            <button className="btn btn-negative mgl" onClick={e => this.handleTimerStop(e)}>STOP</button>
            <button className="btn btn-primary mgl p-timer__start" onClick={e => this.handleTimerStart(e)}>START</button>
          </div>
        </form>
      </div>
    )
  }
}

Timer.propTypes = {
  limit: PropTypes.string,
  minutes: PropTypes.number,
  seconds: PropTypes.number
}

Timer.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    limit: state.timers.limit,
    minutes: state.timers.minutes,
    seconds: state.timers.seconds
  }
})(Timer)
