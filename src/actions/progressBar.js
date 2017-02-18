import * as Types from '../constants'

export function updateProgress (progress, totalSize) {
  return { type: Types.UPDATE_PROGRESS, index: progress, size: totalSize }
}
