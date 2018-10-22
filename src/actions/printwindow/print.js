import * as Types from '../../constants/printwindow/actions';

export function displayPrintPage(markdown, theme, ratio) {
  return {
    type: Types.DISPLAY_PRINT_PAGE, markdown, theme, ratio,
  };
}
