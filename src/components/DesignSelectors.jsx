import React from 'react';
import PropTypes from 'prop-types';

import ThemeSelector from '../containers/ThemeSelector';
import CodeStyle from '../containers/CodeStyle';
import AspectRatio from '../containers/AspectRatioSelector';

const DesignSelectors = ({ fullscreen }) => (
  <header className={`toolbar toolbar-header ${fullscreen ? 'hidden' : 'c-btn-group__show'}`}>
    <div className="toolbar-default">
      <span className="mgl">aspect ratio</span>
      <AspectRatio />
      <span className="mgl">theme:</span>
      <ThemeSelector />
      <span className="mgl">highlight:</span>
      <CodeStyle />
    </div>
  </header>
);

DesignSelectors.propTypes = {
  fullscreen: PropTypes.bool.isRequired,
};

export default DesignSelectors;
