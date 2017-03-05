import * as Types from '../constants/actions'

export function setTotalSeconds (totalSeconds) {
  return { type: Types.SET_TOTAL_SECONDS, totalSeconds: totalSeconds }
}

export function setElapsedIntervalId (intervalId) {
  return { type: Types.SET_INTERVAL_ID, intervalId: intervalId }
}

export function updateElapsedSeconds () {
  return { type: Types.UPDATE_ELAPSED_SECONDS }
}

export function updateProgress (progress, totalSize) {
  return { type: Types.UPDATE_PROGRESS, index: progress, size: totalSize }
}
