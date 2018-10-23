import * as Types from '../../constants/actions';

export function setFullScreen(isFullScreen) {
  return { type: Types.SET_FULL_SCREEN, fullscreen: isFullScreen };
}
