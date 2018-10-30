/* eslint-disable max-len */
import React from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import { zeroPad, calcTotalSeconds, convertTimeToNumber } from '../utils';
import Button from './Button';

class TimerContent extends React.Component {
  handleTimerStart() {
    const { limit, startTimer } = this.props;

    if (convertTimeToNumber(limit).length === 3) {
      this.sendTotalSeconds();
      const intervalId = setInterval(() => this.tick(), 1000);
      startTimer(intervalId);
    }
  }

  handleTimerStop() {
    const { intervalId, stopTimer } = this.props;

    this.stopTimerInPage();
    stopTimer(intervalId);
  }

  notifyTimeUp() {
    const {
      limit,
      startBlinkPage,
      stopBlinkPage,
      changeValue,
    } = this.props;

    startBlinkPage();
    setTimeout(() => {
      stopBlinkPage();
      changeValue(limit);
    }, 5000);
  }

  tick() {
    const {
      hours,
      minutes,
      seconds,
      intervalId,
      stopTimer,
      runTicker,
    } = this.props;

    if (hours === 0 && minutes === 0 && seconds === 0) {
      stopTimer(intervalId);
      this.notifyTimeUp();
    } else {
      runTicker(hours, minutes, seconds);
    }
  }

  sendTotalSeconds() {
    const { hours, minutes, seconds } = this.props;
    ipcRenderer.send('send-total-seconds', { totalSeconds: calcTotalSeconds(hours, minutes, seconds) });
  }

  stopTimerInPage() {
    ipcRenderer.send('stop-timer-in-page');
  }

  render() {
    const {
      limit,
      hours,
      minutes,
      seconds,
      started,
      blink,
      changeValue,
      resetTimer,
      clearTimer,
    } = this.props;
    const isLimitInvalid = (convertTimeToNumber(limit).length !== 3);

    return (
      <div className={`p-timer ${blink ? 'p-timer__blink' : ''}`}>
        <div className="p-timer__display">
          {zeroPad(hours)}
:
          {zeroPad(minutes)}
:
          {zeroPad(seconds)}
        </div>

        <form className="p-timer__time mgl">
          <div className="form-group">
            <span>Timer</span>
            <input
              type="time"
              id="limit"
              className="p-timer__input mgl mgt"
              value={limit}
              onChange={e => changeValue(e.target.value)}
              disabled={started}
              step="1"
            />
            <Button onClick={resetTimer} started={started} label="RESET" />
            <Button onClick={clearTimer} started={started} label="CLEAR" />
            { !started
              && <button type="button" className="btn btn-primary mgl p-timer__start" onClick={() => this.handleTimerStart()} disabled={isLimitInvalid}>START</button>
            }
            { started
              && <button type="button" className="btn btn-negative mgl" onClick={() => this.handleTimerStop()}>STOP</button>
            }
          </div>
        </form>
      </div>
    );
  }
}

TimerContent.propTypes = {
  limit: PropTypes.string,
  hours: PropTypes.number,
  minutes: PropTypes.number,
  seconds: PropTypes.number,
  started: PropTypes.bool,
  intervalId: PropTypes.node,
  blink: PropTypes.bool,
  resetTimer: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  runTicker: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  clearTimer: PropTypes.func.isRequired,
  startBlinkPage: PropTypes.func.isRequired,
  stopBlinkPage: PropTypes.func.isRequired,
};

TimerContent.defaultProps = {
  limit: '',
  hours: 0,
  minutes: 0,
  seconds: 0,
  started: false,
  intervalId: 0,
  blink: false,
};

export default TimerContent;
