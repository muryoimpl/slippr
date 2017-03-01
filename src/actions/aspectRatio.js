import * as Types from '../constants/actions'

export function selectRatio (ratio) {
  return { type: Types.SELECT_RATIO, ratio: ratio }
}
