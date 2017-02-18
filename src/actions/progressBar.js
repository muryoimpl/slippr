import * as Types from '../constants/actions'

export function updateProgress (progress, totalSize) {
  return { type: Types.UPDATE_PROGRESS, index: progress, size: totalSize }
}
