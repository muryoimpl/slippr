import React from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';

import AspectStyle from '../../components/AspectStyle';
import HighlightCssLink from '../../components/HighlightCssLink';
import { renderPrintHtmlPage } from '../../utils/markdownConverter';

class Print extends React.Component {
  componentDidMount() {
    const { displayPrintPage } = this.props;

    ipcRenderer.on('reply-get-print-target', (event, json) => {
      displayPrintPage(json);
      this.render();
    });

    ipcRenderer.send('get-print-target');
  }

  render() {
    const {
      markdown,
      theme,
      ratio,
      highlight,
    } = this.props;

    /* eslint-disable react/no-danger */
    return (
      <div className="window">
        <div className="p-print-page">
          <AspectStyle ratio={ratio} />
          <HighlightCssLink highlight={highlight} />
          <div className="p-print-page" dangerouslySetInnerHTML={{ __html: renderPrintHtmlPage(markdown, theme, ratio) }} />
        </div>
      </div>
    );
  }
}

Print.propTypes = {
  theme: PropTypes.string,
  markdown: PropTypes.string,
  ratio: PropTypes.number,
  highlight: PropTypes.string,
  displayPrintPage: PropTypes.func.isRequired,
};

Print.defaultProps = {
  theme: '',
  markdown: '',
  ratio: 0,
  highlight: '',
};

export default Print;
