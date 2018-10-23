/* eslint-disable max-len */
import React from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import PageButton from '../../components/PageButton';

class PageButtons extends React.Component {
  handleFullScreen(isFullScreen) {
    const { setFullScreen } = this.props;
    setFullScreen(isFullScreen);

    const command = isFullScreen ? 'full-screen' : 'normal-screen';
    ipcRenderer.send(command);
  }

  handleTogglePlayScreen(isPlayScreen) {
    const { router } = this.context;
    const { setPlayScreen } = this.props;

    setPlayScreen(isPlayScreen);

    if (isPlayScreen) {
      router.history.push('/pages/0');
    } else {
      router.history.push('/');
    }
  }

  render() {
    const {
      showIcons,
      playscreen,
      fullscreen,
      theme,
      markdown,
      ratio,
      highlight,
      toggleIcons,
    } = this.props;

    const existMarkdown = !!markdown;

    return (
      <div className="pull-right">
        <PageButton
          onClick={() => ipcRenderer.send('open-print-window', { markdown, theme, ratio, highlight })} // eslint-disable-line object-curly-newline
          title="Print PDF"
          className="mgr-one-btn"
          iconName="icon-print"
          label="print"
        />

        { showIcons
          && (
            <PageButton
              onClick={() => toggleIcons(false)}
              title="Hide icons in slide"
              className="mgr-one-btn"
              iconName="icon-hourglass"
              label="hide icons"
            />
          )
        }
        { !showIcons
          && (
            <PageButton
              onClick={() => toggleIcons(true)}
              title="Show icons in slide"
              className="mgr-one-btn"
              iconName="icon-hourglass"
              label="show icons"
            />
          )
        }

        <PageButton
          onClick={() => ipcRenderer.send('open-child-window')}
          title="Open timer"
          className={`mgr-one-btn ${existMarkdown ? '' : 'c-btn__disabled'}`}
          iconName="icon-clock"
          label="open timer"
          disabled={!existMarkdown}
        />

        { !playscreen
          && (
            <PageButton
              onClick={() => this.handleTogglePlayScreen(true)}
              title="Transition to play screen"
              className={`mgr-one-btn ${existMarkdown ? '' : 'c-btn__disabled'}`}
              iconName="icon-play"
              label=""
              disabled={!existMarkdown}
            />
          )
        }
        { playscreen
          && (
            <PageButton
              onClick={() => this.handleTogglePlayScreen(false)}
              title="Back to edit screen"
              className={`mgr-one-btn ${existMarkdown ? '' : 'c-btn__disabled'}`}
              iconName="icon-stop"
              label=""
              disabled={!existMarkdown}
            />
          )
        }

        { fullscreen && playscreen
          && (
            <PageButton
              onClick={() => this.handleFullScreen(false)}
              title="Normal screen"
              iconName="icon-resize-small"
            />
          )
        }
        { !fullscreen && playscreen
          && (
            <PageButton
              onClick={() => this.handleFullScreen(true)}
              title="Full screen"
              className={`mgr-one-btn ${existMarkdown ? '' : 'c-btn__disabled'}`}
              iconName="icon-resize-full"
              label=""
              disabled={!existMarkdown}
            />
          )
        }
      </div>
    );
  }
}

PageButtons.propTypes = {
  markdown: PropTypes.string,
  showIcons: PropTypes.bool,
  theme: PropTypes.string,
  ratio: PropTypes.number,
  highlight: PropTypes.string,
  fullscreen: PropTypes.bool,
  playscreen: PropTypes.bool,
  toggleIcons: PropTypes.func.isRequired,
  setPlayScreen: PropTypes.func.isRequired,
  setFullScreen: PropTypes.func.isRequired,
};

PageButtons.defaultProps = {
  markdown: '',
  showIcons: false,
  theme: '',
  ratio: 0,
  highlight: '',
  fullscreen: false,
  playscreen: false,
};

PageButtons.contextTypes = {
  router: PropTypes.object,
};

export default PageButtons;
