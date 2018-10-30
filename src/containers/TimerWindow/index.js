import { connect } from 'react-redux';

import Timer from './Timer';
import {
  resetTimer,
  changeValue,
  startTimer,
  runTicker,
  stopTimer,
  clearTimer,
  startBlinkPage,
  stopBlinkPage,
} from './action';

const mapStateToProps = state => ({
  limit: state.timers.limit,
  hours: state.timers.hours,
  minutes: state.timers.minutes,
  seconds: state.timers.seconds,
  started: state.timers.started,
  intervalId: state.timers.intervalId,
  blink: state.timers.blink,
});

const mapDispatchToProps = dispatch => ({
  resetTimer: () => dispatch(resetTimer()),
  changeValue: value => dispatch(changeValue(value)),
  startTimer: intervalId => dispatch(startTimer(intervalId)),
  runTicker: (hours, minutes, seconds) => dispatch(runTicker(hours, minutes, seconds)),
  stopTimer: intervalId => dispatch(stopTimer(intervalId)),
  clearTimer: () => dispatch(clearTimer()),
  startBlinkPage: () => dispatch(startBlinkPage()),
  stopBlinkPage: () => dispatch(stopBlinkPage()),
});

const TimerWindow = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default TimerWindow;
