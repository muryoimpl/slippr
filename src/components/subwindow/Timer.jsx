import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import * as timerActions from '../../actions/subwindow/timer'

class Timer extends React.Component {
  handleResetClick (e) {
    e.preventDefault()
    const { store } = this.context

    store.dispatch(timerActions.resetTimer())
  }

  handleChangeValue (e) {
    const { store } = this.context

    store.dispatch(timerActions.changeValue(e.target.value))
  }

  handleTimerStart (e) {
    e.preventDefault()
  }

  render () {
    const { limit } = this.props

    return (
      <div className="p-timer">
        <div className="p-timer__display">
          5:00
        </div>

        <form className="p-timer__time mgl">
          <div className="form-group">
            <span>Timer</span>
            <input type="time" id="limit" className="p-timer__input mgl mgt" value={limit} onChange={e => this.handleChangeValue(e)} autoFocus="true" />
            <button className="btn btn-default mgl" onClick={e => this.handleResetClick(e)}>RESET</button>
            <button className="btn btn-primary mgl p-timer__start" onClick={e => this.handleTimerStart(e)}>START</button>
          </div>
        </form>
      </div>
    )
  }
}

Timer.propTypes = {
  limit: PropTypes.string
}

Timer.contextTypes = {
  store: PropTypes.object
}

export default connect((state) => {
  return {
    limit: state.timers.limit
  }
})(Timer)
