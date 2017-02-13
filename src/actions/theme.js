import * as Types from '../constants'

export function selectTheme (theme) {
  return { type: Types.SELECT_THEME, theme: theme }
}
