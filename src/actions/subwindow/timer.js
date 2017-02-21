import * as Types from '../../constants/subwindow/actions'
import { convertTimeToNumber } from '../../utils/timeConverter'

export function resetTimer () {
  return { type: Types.RESET_TIMER }
}

export function changeValue (value) {
  const time = convertTimeToNumber(value)
  return { type: Types.CHANGE_VALUE, limit: value, minutes: time[0], seconds: time[1] }
}

export function startTimer (intervalId) {
  return { type: Types.START_TIMER, intervalId: intervalId }
}

export function runTicker (minutes, seconds) {
  return { type: Types.RUN_TICKER, minutes: minutes, seconds: seconds }
}

export function stopTimer (intervalId) {
  return { type: Types.STOP_TIMER, intervalId: intervalId }
}
