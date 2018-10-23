import * as Types from '../../constants/actions';

export function selectTheme(theme) {
  return { type: Types.SELECT_THEME, theme };
}
