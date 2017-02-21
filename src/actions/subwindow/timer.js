import * as Types from '../../constants/subwindow/actions'
import { convertTimeToNumber } from '../../utils/timeConverter'

export function resetTimer () {
  return { type: Types.RESET_TIMER }
}

export function changeValue (value) {
  const time = convertTimeToNumber(value)
  return { type: Types.CHANGE_VALUE, limit: value, minutes: time[0], seconds: time[1] }
}

export function startTimer (value) {
  const time = convertTimeToNumber(value)
  return { type: Types.START_TIMER, minutes: Number(time[0]), seconds: Number(time[1]) }
}

export function stopTimer () {
  return { type: Types.STOP_TIMER }
}
