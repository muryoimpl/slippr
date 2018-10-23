import React from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import ProgressBar from '../ProgressBar';
import { renderHtmlPage } from '../../utils/markdownConverter';
import * as keyCodeChecker from '../../utils/keyCodeChecker';

class Page extends React.Component {
  constructor() {
    super();
    // こうしないと、this が event のコンテキストになる
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }

  componentDidMount() {
    const { match, splitMarkdownAsPages, markdown } = this.props;

    splitMarkdownAsPages(markdown);

    this.updatePageIndex(match.params.idx);
    this.registerIpcEvents();
    document.addEventListener('keydown', this.handleOnKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown);
  }

  registerIpcEvents() {
    ipcRenderer.on('transition-page', (_event, json) => {
      this.handleKeyAction(json.keyCode);
    });
  }

  handleOnKeyDown(event) {
    this.handleKeyAction(event.keyCode);
  }

  handleKeyAction(keyCode) {
    const {
      markdownPages,
      idx,
      clearPages,
      setPlayScreen,
    } = this.props;

    if (keyCodeChecker.isNextPageKey(keyCode) && idx < markdownPages.length - 1) {
      const nextIdx = idx + 1;
      this.transitionTo(nextIdx);
    }

    if (keyCodeChecker.isPrevPageKey(keyCode) && idx > 0) {
      const prevIdx = idx - 1;
      this.transitionTo(prevIdx);
    }

    if (keyCodeChecker.isEscapeKey(keyCode)) {
      clearPages();
      setPlayScreen(false);
      this.backToHome();
    }
  }

  updatePageIndex(idx) {
    const { markdownPages, updatePageIndex, updateProgress } = this.props;

    updatePageIndex(Number(idx));
    updateProgress(Number(idx), markdownPages.length);
  }

  transitionTo(nextIdx) {
    const { router } = this.context;

    this.updatePageIndex(nextIdx);
    router.history.push(`/pages/${nextIdx}`);
  }

  backToHome() {
    const { router } = this.context;
    const { setFullScreen } = this.props;

    setFullScreen(false);
    router.history.push('/');
    ipcRenderer.send('normal-screen');
  }

  render() {
    const { markdownPages, idx, selectedTheme } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div role="presentation" className={`p-page ${selectedTheme}`} onKeyDown={e => this.handleOnKeyDown(e)}>
        <div className="p-page__inner" dangerouslySetInnerHTML={{ __html: renderHtmlPage(markdownPages[idx]) }} />
        <ProgressBar />
      </div>
    );
  }
}

Page.propTypes = {
  markdownPages: PropTypes.arrayOf(PropTypes.string),
  idx: PropTypes.number,
  selectedTheme: PropTypes.string,
  match: PropTypes.object,
  updatePageIndex: PropTypes.func.isRequired,
  updateProgress: PropTypes.func.isRequired,
  clearPages: PropTypes.func.isRequired,
  setPlayScreen: PropTypes.func.isRequired,
  setFullScreen: PropTypes.func.isRequired,
  splitMarkdownAsPages: PropTypes.func.isRequired,
  markdown: PropTypes.string,
};

Page.defaultProps = {
  markdownPages: [],
  idx: 0,
  selectedTheme: '',
  match: {},
  markdown: '',
};

Page.contextTypes = {
  router: PropTypes.object,
};

export default Page;
