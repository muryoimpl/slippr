import * as Types from '../constants/header'

export function setFileName (filename) {
  return { type: Types.SET_FILE_NAME, filename: filename }
}
