import * as Types from '../constants/actions'

export function selectHighlightTheme (theme) {
  return { type: Types.SELECT_HIGHLIGHT_THEME, theme: theme }
}
