import * as Types from '../../constants/actions';

export function setFileName(filename) {
  return { type: Types.SET_FILE_NAME, filename };
}
