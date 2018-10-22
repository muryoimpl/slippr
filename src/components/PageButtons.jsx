/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import * as headerActions from '../actions/header';
import * as pageActions from '../actions/page';
import * as progressBarActions from '../actions/progressBar';
import * as styleHandler from '../utils/styleHandler';

export default class PageButtons extends React.Component {
  handleFullScreen(isFullScreen) {
    const { store } = this.context;

    store.dispatch(headerActions.setFullScreen(isFullScreen));

    if (isFullScreen) {
      ipcRenderer.send('full-screen');
    } else {
      ipcRenderer.send('normal-screen');
    }
  }

  handleTogglePlayScreen(isPlayScreen) {
    const { store, router } = this.context;
    const { markdown } = this.props;

    store.dispatch(headerActions.setPlayScreen(isPlayScreen));

    if (isPlayScreen) {
      store.dispatch(pageActions.splitMarkdownAsPages(markdown));
      router.history.push('/pages/0');
    } else {
      router.history.push('/');
    }
  }

  handleOpenChildWindow() {
    ipcRenderer.send('open-child-window');
  }

  handleToggleIcons(toShow) {
    const { store } = this.context;
    store.dispatch(progressBarActions.toggleIcons(toShow));
  }

  handlePrintPDF() {
    const {
      markdown, theme, ratio, highlight,
    } = this.props;
    ipcRenderer.send('open-print-window', {
      markdown, theme, ratio, highlight,
    });
  }

  render() {
    const {
      existMarkdown,
      showIcons,
      playscreen,
      fullscreen,
    } = this.props;
    const btnStyle = styleHandler.buttonDisabledStyle(existMarkdown);

    return (
      <div className="pull-right">
        <button type="button" className="btn btn-default mgr-one-btn" onClick={() => this.handlePrintPDF()} title="Print PDF">
          <span className="icon icon-print mgr" />
          print
        </button>

        { showIcons
          && (
          <button type="button" className="btn btn-default mgr-one-btn" onClick={() => this.handleToggleIcons(false)} title="Hide icons in slide">
            <span className="icon icon-hourglass mgr" />
            hide icons
          </button>
          )
        }
        { !showIcons
          && (
          <button type="button" className="btn btn-default mgr-one-btn" onClick={() => this.handleToggleIcons(true)} title="Show icons in slide">
            <span className="icon icon-hourglass mgr" />
            show icons
          </button>
          )
        }

        <button type="button" className={`${classNames(btnStyle)} mgr-one-btn`} onClick={e => this.handleOpenChildWindow(e)} title="Open timer" disabled={!existMarkdown}>
          <span className="icon icon-clock mgr" />
          open timer
        </button>

        { !playscreen
          && (
          <button type="button" className={`${classNames(btnStyle)}`} onClick={() => this.handleTogglePlayScreen(true)} disabled={!existMarkdown} title="Transition to play screen">
            <span className="icon icon-play" />
          </button>
          )
        }
        { playscreen
          && (
          <button type="button" className={`${classNames(btnStyle)}`} onClick={() => this.handleTogglePlayScreen(false)} disabled={!existMarkdown} title="Back to edit screen">
            <span className="icon icon-stop" />
          </button>
          )
        }

        { fullscreen && playscreen
          && (
          <button type="button" className="btn btn-default" onClick={() => this.handleFullScreen(false)} title="Normal screen">
            <span className="icon icon-resize-small" />
          </button>
          )
        }
        { !fullscreen && playscreen
          && (
          <button type="button" className={`${classNames(btnStyle)}`} onClick={() => this.handleFullScreen(true)} disabled={!existMarkdown} title="Full screen">
            <span className="icon icon-resize-full" />
          </button>
          )
        }
      </div>
    );
  }
}

PageButtons.propTypes = {
  existMarkdown: PropTypes.bool,
  markdown: PropTypes.string,
  showIcons: PropTypes.bool,
  theme: PropTypes.string,
  ratio: PropTypes.number,
  highlight: PropTypes.string,
  fullscreen: PropTypes.bool,
  playscreen: PropTypes.bool,
};

PageButtons.defaultProps = {
  existMarkdown: false,
  markdown: '',
  showIcons: false,
  theme: '',
  ratio: 0,
  highlight: '',
  fullscreen: false,
  playscreen: false,
};

PageButtons.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};
