/* eslint-disable max-len */
import React from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import { calcTimeProgress } from '../../utils/timeConverter';

class ProgressBar extends React.Component {
  componentDidMount() {
    this.registerIpcEvents();
  }

  registerIpcEvents() {
    const {
      intervalId,
      setTotalSeconds,
      setElapsedIntervalId,
      stopElapsedTimeRunning,
    } = this.props;

    ipcRenderer.on('start-timer-in-page', (_event, json) => {
      setTotalSeconds(json.totalSeconds);
      const id = setInterval(() => this.tick(), 1000);
      setElapsedIntervalId(id);
    });

    ipcRenderer.on('stop-timer-in-page', () => {
      stopElapsedTimeRunning(intervalId);
    });
  }

  tick() {
    const {
      totalSeconds,
      elapsedSeconds,
      intervalId,
      updateElapsedSeconds,
      stopElapsedTimeRunning,
    } = this.props;

    if (totalSeconds > elapsedSeconds) {
      updateElapsedSeconds(elapsedSeconds);
    }

    if (totalSeconds !== 0 && totalSeconds === elapsedSeconds) {
      stopElapsedTimeRunning(intervalId);
    }
  }

  render() {
    const {
      progress,
      elapsedSeconds,
      totalSeconds,
      showIcons,
    } = this.props;

    return (
      <div className="p-proggress-area">
        { totalSeconds !== 0 && showIcons
          && (
            <span className="p-progress-icon-area" style={{ width: `${progress}%` }}>
              <img alt="koko" src="assets/images/emoji/koko.png" className="p-progress-icon" />
            </span>
          )
        }
        { totalSeconds !== 0 && showIcons
          && (
            <span className="p-progress-icon-area" style={{ width: `${calcTimeProgress(elapsedSeconds, totalSeconds)}%` }}>
              <img alt="hourglass" src="assets/images/emoji/hourglass_flowing_sand.png" className="p-progress-icon" />
            </span>
          )
        }
        <progress className="p-progress-bar" max={100} value={progress} />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  progress: PropTypes.number,
  elapsedSeconds: PropTypes.number,
  totalSeconds: PropTypes.number,
  intervalId: PropTypes.node,
  showIcons: PropTypes.bool,
  setTotalSeconds: PropTypes.func.isRequired,
  setElapsedIntervalId: PropTypes.func.isRequired,
  stopElapsedTimeRunning: PropTypes.func.isRequired,
  updateElapsedSeconds: PropTypes.func.isRequired,
};

ProgressBar.defaultProps = {
  progress: 0,
  elapsedSeconds: 0,
  totalSeconds: 0,
  intervalId: 0,
  showIcons: false,
};

export default ProgressBar;
