export function buttonDisabledStyle (existMarkdown) {
  return {
    'btn': true,
    'btn-default': true,
    'c-btn__disabled': !existMarkdown
  }
}
