import * as Types from '../../constants/actions';

export function splitMarkdownAsPages(text) {
  const splitMarkdown = text.split(/\n+(?:\*|-){3,}\n+/);
  return { type: Types.SPLIT_MARKDOWN_AS_PAGES, markdownPages: splitMarkdown };
}

export function updatePageIndex(idx) {
  return { type: Types.UPDATE_PAGE_INDEX, idx };
}

export function updateProgress(progress, totalSize) {
  return { type: Types.UPDATE_PROGRESS, index: progress, size: totalSize };
}

export function clearPages() {
  return { type: Types.CLEAR_PAGES };
}

export function setPlayScreen(isPlayScreen) {
  return { type: Types.SET_PLAY_SCREEN, playscreen: isPlayScreen };
}

/* Duplicate */
export function setFullScreen(isFullScreen) {
  return { type: Types.SET_FULL_SCREEN, fullscreen: isFullScreen };
}
