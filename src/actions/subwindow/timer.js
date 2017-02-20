import * as Types from '../../constants/subwindow/actions'

export function resetTimer () {
  return { type: Types.RESET_TIMER }
}

export function changeValue (value) {
  return { type: Types.CHANGE_VALUE, limit: value }
}
