import React from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';

import TimerContent from './Timer/TimerContent';
import * as keyCodeConst from '../../constants/keyCode';

class TimerApp extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleOnKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown);
  }

  handleOnKeyDown(e) {
    if (document.activeElement.id !== 'limit' && keyCodeConst.TRANSITION_KEY_CODES.includes(e.keyCode)) {
      ipcRenderer.send('transition-page', { keyCode: e.keyCode });
    }
  }

  render() {
    const {
      limit,
      hours,
      minutes,
      seconds,
      started,
      intervalId,
      blink,
      resetTimer,
      changeValue,
      startTimer,
      runTicker,
      stopTimer,
      clearTimer,
      startBlinkPage,
      stopBlinkPage,
    } = this.props;

    return (
      <div className="window p-timer">
        <header className="toolbar toolbar-header" />

        <div className="window-content">
          <TimerContent
            limit={limit}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            started={started}
            intervalId={intervalId}
            blink={blink}
            resetTimer={resetTimer}
            changeValue={changeValue}
            startTimer={startTimer}
            runTicker={runTicker}
            stopTimer={stopTimer}
            clearTimer={clearTimer}
            startBlinkPage={startBlinkPage}
            stopBlinkPage={stopBlinkPage}
          />
        </div>

        <footer className="toolbar toolbar-footer" />
      </div>
    );
  }
}

TimerApp.propTypes = {
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

TimerApp.defaultProps = {
  limit: '',
  hours: 0,
  minutes: 0,
  seconds: 0,
  started: false,
  intervalId: 0,
  blink: false,
};

export default TimerApp;
