import React from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import Textarea from './Textarea';
import * as pageActions from '../actions/page';
import * as headerActions from '../actions/header';
import { renderHtmlPreview } from '../utils/markdownConverter';

class Home extends React.Component {
  componentDidMount() {
    const dom = document.querySelector('.pane.p-preview');
    dom.addEventListener('drop', this.disableEvent);
    dom.addEventListener('dragover', this.disableEvent);
  }

  componentWillUnmount() {
    const dom = document.querySelector('.pane.p-preview');
    dom.removeEventListener('drop', this.disableEvent);
    dom.removeEventListener('dragover', this.disableEvent);
  }

  disableEvent(e) {
    e.preventDefault();
    return false;
  }

  handlePreviewClick(e) {
    const { store, router } = this.context;
    const { markdown } = this.props;
    const idx = e.target.dataset.index;

    if (!markdown) {
      return false;
    }

    store.dispatch(headerActions.setFullScreen(true));
    store.dispatch(pageActions.splitMarkdownAsPages(markdown));

    router.history.push(`/pages/${idx}`);
    ipcRenderer.send('full-screen');
    return false;
  }

  render() {
    const { markdown, selected } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div className="pane-group">
        <div className="pane">
          <Textarea />
        </div>
        <div className="pane p-preview">
          <div dangerouslySetInnerHTML={{ __html: renderHtmlPreview(markdown, selected) }} />
          <button type="button" data-index id="pv" className="hidden" onClick={e => this.handlePreviewClick(e)} />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  markdown: PropTypes.string,
  selected: PropTypes.string,
};

Home.defaultProps = {
  markdown: '',
  selected: '',
};

Home.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};

export default connect(state => ({
  markdown: state.textareas.markdown,
  selected: state.themes.selected,
}))(Home);
