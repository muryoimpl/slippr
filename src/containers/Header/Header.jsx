import React from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import RightPageButtons from '../RightPageButtons';
import PageButton from '../../components/PageButton';

class Header extends React.Component {
  componentDidMount() {
    const { setMarkdownText, setFileName } = this.props;

    ipcRenderer.on('reply-file-dialog', (event, json) => {
      setMarkdownText(json.markdown);
      setFileName(json.filename);
    });

    ipcRenderer.on('reply-save-dialog', (event, json) => {
      setFileName(json.filename);
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

  render() {
    const {
      markdown,
      filename,
      fullscreen,
    } = this.props;

    const existMarkdown = !!markdown;
    const existFilename = !!filename;

    return (
      <header className={`toolbar toolbar-header ${fullscreen ? 'hidden' : 'c-btn-group__show'}`}>
        <h1 className="title">
          { !fullscreen && filename }
        </h1>

        <div className="toolbar-default">
          <PageButton
            onClick={() => ipcRenderer.send('show-file-dialog', '')}
            title=""
            iconName="icon-folder"
            label="open"
          />

          <PageButton
            onClick={() => ipcRenderer.send('save-file-dialog', { markdown })}
            className={`${existMarkdown ? '' : 'c-btn__disabled'}`}
            iconName="icon-doc-text"
            label="save as"
            disabled={!existMarkdown}
          />

          <PageButton
            onClick={() => ipcRenderer.send('overwrite-file', { markdown, filename })}
            className={`${existFilename ? '' : 'c-btn__disabled'}`}
            iconName="icon-doc-text"
            label="overwrite"
            disabled={!existFilename}
          />
          <span id="saved" className="mgl hidden">Saved!!</span>

          <RightPageButtons />
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  filename: PropTypes.string,
  markdown: PropTypes.string,
  fullscreen: PropTypes.bool.isRequired,
  setMarkdownText: PropTypes.func.isRequired,
  setFileName: PropTypes.func.isRequired,
};

Header.defaultProps = {
  filename: '',
  markdown: '',
};

export default Header;
