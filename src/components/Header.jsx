import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import * as headerActions from '../actions/header';
import * as textareaActions from '../actions/textarea';
import PageButtons from './PageButtons';
import * as styleHandler from '../utils/styleHandler';

class Header extends React.Component {
  componentDidMount() {
    const { store } = this.context;

    ipcRenderer.on('reply-file-dialog', (event, json) => {
      store.dispatch(textareaActions.setMarkdownText(json.markdown));
      store.dispatch(headerActions.setFileName(json.filename));
    });

    ipcRenderer.on('reply-save-dialog', (event, json) => {
      store.dispatch(headerActions.setFileName(json.filename));
    });

    ipcRenderer.on('reply-overwrite-file', () => {
      const dom = document.getElementById('saved');
      dom.classList.remove('hidden');
      dom.classList.add('c-btn__saved');
      setTimeout(() => {
        dom.classList.add('hidden');
        dom.classList.remove('c-btn__saved');
      }, 3000);
    });
  }

  handleOpenFile() {
    ipcRenderer.send('show-file-dialog', '');
  }

  handleSaveFileAs() {
    const { markdown } = this.props;
    ipcRenderer.send('save-file-dialog', { markdown });
  }

  handleOverwriteFileAs() {
    const { markdown, filename } = this.props;
    ipcRenderer.send('overwrite-file', { markdown, filename });
  }

  render() {
    const {
      markdown,
      filename,
      fullscreen,
      theme,
      ratio,
      highlight,
      playscreen,
      showIcons,
    } = this.props;
    const existMarkdown = !!markdown;
    const btnStyle = styleHandler.buttonDisabledStyle(existMarkdown);
    const existFilename = !!filename;
    const overwriteBtnStyle = styleHandler.buttonDisabledStyle(existFilename);

    return (
      <header className={`toolbar toolbar-header ${fullscreen ? 'hidden' : 'c-btn-group__show'}`}>
        <h1 className="title">
          { !fullscreen && filename }
        </h1>

        <div className="toolbar-default">
          <button type="button" className="btn btn-default" onClick={() => this.handleOpenFile()}>
            <span className="icon icon-folder mgr" />
            open
          </button>

          <button type="button" className={classNames(btnStyle)} onClick={() => this.handleSaveFileAs()} disabled={!existMarkdown}>
            <span className="icon icon-doc-text mgr" />
            save as
          </button>

          <button type="button" className={classNames(overwriteBtnStyle)} onClick={() => this.handleOverwriteFileAs()} disabled={!existFilename}>
            <span className="icon icon-doc-text mgr" />
            overwrite
          </button>

          <span id="saved" className="mgl hidden">Saved!!</span>

          <PageButtons
            existMarkdown={!!existMarkdown}
            markdown={markdown}
            showIcons={showIcons}
            theme={theme}
            ratio={ratio}
            highlight={highlight}
            fullscreen={fullscreen}
            playscreen={playscreen}
          />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  filename: PropTypes.string,
  markdown: PropTypes.string,
  fullscreen: PropTypes.bool.isRequired,
  playscreen: PropTypes.bool.isRequired,
  showIcons: PropTypes.bool.isRequired,
  theme: PropTypes.string,
  ratio: PropTypes.number,
  highlight: PropTypes.string,
};

Header.defaultProps = {
  filename: '',
  markdown: '',
  theme: '',
  ratio: 0,
  highlight: '',
};

Header.contextTypes = {
  store: PropTypes.object,
};

export default connect(state => ({
  filename: state.headers.filename,
  markdown: state.textareas.markdown,
  fullscreen: state.headers.fullscreen,
  playscreen: state.headers.playscreen,
  showIcons: state.progressBar.showIcons,
  theme: state.themes.selected,
  ratio: state.aspectRatio.ratio,
  highlight: state.codeStyles.selected,
}))(Header);
