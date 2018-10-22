import * as Types from '../constants/actions';

export function setTotalSeconds(totalSeconds) {
  return { type: Types.SET_TOTAL_SECONDS, totalSeconds };
}

export function setElapsedIntervalId(intervalId) {
  return { type: Types.SET_ELAPSED_INTERVAL_ID, intervalId };
}

export function updateElapsedSeconds(elapsedSeconds) {
  return { type: Types.UPDATE_ELAPSED_SECONDS, elapsedSeconds };
}

export function updateProgress(progress, totalSize) {
  return { type: Types.UPDATE_PROGRESS, index: progress, size: totalSize };
}

export function stopElapsedTimeRunning(intervalId) {
  return { type: Types.STOP_ELAPSED_TIME_RUNNING, intervalId };
}

export function toggleIcons(toShow) {
  return { type: Types.TOGGLE_ICONS, show: toShow };
}
