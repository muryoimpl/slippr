import * as Types from '../constants'

export function selectHighlightTheme (theme) {
  return { type: Types.SELECT_HIGHLIGHT_THEME, theme: theme }
}
