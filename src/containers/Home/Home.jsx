import React from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import Textarea from '../Textarea';
import { renderHtmlPreview } from '../../utils/markdownConverter';

class Home extends React.Component {
  componentDidMount() {
    this.bindEvents();
  }

  componentWillUnmount() {
    this.bindEvents();
  }

  bindEvents() {
    const dom = document.querySelector('.pane.p-preview');
    dom.removeEventListener('drop', this.disableEvent);
    dom.removeEventListener('dragover', this.disableEvent);
  }

  disableEvent(e) {
    e.preventDefault();
    return false;
  }

  handlePreviewClick(e) {
    const { router } = this.context;
    const { markdown, setFullScreen } = this.props;
    const idx = e.target.dataset.index;

    if (!markdown) {
      return false;
    }

    setFullScreen(true);
    router.history.push(`/pages/${idx}`);
    ipcRenderer.send('full-screen');
    return false;
  }

  render() {
    const { markdown, selectedTheme } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div className="pane-group">
        <div className="pane">
          <Textarea />
        </div>
        <div className="pane p-preview">
          <div dangerouslySetInnerHTML={{ __html: renderHtmlPreview(markdown, selectedTheme) }} />
          <button type="button" data-index id="pv" className="hidden" onClick={e => this.handlePreviewClick(e)} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  markdown: PropTypes.string,
  selectedTheme: PropTypes.string,
  setFullScreen: PropTypes.func.isRequired,
};

Home.defaultProps = {
  markdown: '',
  selectedTheme: '',
};

Home.contextTypes = {
  router: PropTypes.object,
};

export default Home;
