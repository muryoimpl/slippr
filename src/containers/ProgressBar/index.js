import { connect } from 'react-redux';

import ProgressBarContent from './ProgressBar';
import {
  setTotalSeconds,
  setElapsedIntervalId,
  updateElapsedSeconds,
  updateProgress,
  stopElapsedTimeRunning,
  toggleIcons,
} from './action';

const mapStateToProps = state => ({
  progress: state.progressBar.progress,
  elapsedSeconds: state.progressBar.elapsedSeconds,
  totalSeconds: state.progressBar.totalSeconds,
  intervalId: state.progressBar.intervalId,
  showIcons: state.progressBar.showIcons,
});

const mapDispatchToProps = dispatch => ({
  setTotalSeconds: totalSeconds => (dispatch(setTotalSeconds(totalSeconds))),
  setElapsedIntervalId: intervalId => (dispatch(setElapsedIntervalId(intervalId))),
  updateElapsedSeconds: elapsedSeconds => (dispatch(updateElapsedSeconds(elapsedSeconds))),
  updateProgress: (progress, totalSize) => (dispatch(updateProgress(progress, totalSize))),
  stopElapsedTimeRunning: intervalId => (dispatch(stopElapsedTimeRunning(intervalId))),
  toggleIcons: bool => (dispatch(toggleIcons(bool))),
});

const ProgressBar = connect(mapStateToProps, mapDispatchToProps)(ProgressBarContent);

export default ProgressBar;
