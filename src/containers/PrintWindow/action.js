import * as Types from './constant';

export function displayPrintPage(markdown, theme, ratio, highlight) {
  return {
    type: Types.DISPLAY_PRINT_PAGE,
    markdown,
    theme,
    ratio,
    highlight,
  };
}
