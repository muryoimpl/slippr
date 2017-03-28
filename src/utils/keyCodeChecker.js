import * as keyCodeConst from '../constants/keyCode'

export function isNextPageKey (keyCode) {
  return keyCode === keyCodeConst.RIGHT_ARROW || keyCode === keyCodeConst.DOWN_ARROW
}

export function isPrevPageKey (keyCode) {
  return keyCode === keyCodeConst.LEFT_ARROW || keyCode === keyCodeConst.UP_ARROW
}

export function isEscapeKey (keyCode) {
  return keyCode === keyCodeConst.ESCAPE
}
