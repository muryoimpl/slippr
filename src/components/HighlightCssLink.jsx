import React from 'react';
import PropTypes from 'prop-types';

const HighlightCssLink = ({ highlight }) => (
  <link rel="stylesheet" href={`../node_modules/highlight.js/styles/${highlight}.css`} media="screen,print" />
);

HighlightCssLink.propTypes = {
  highlight: PropTypes.string,
};

HighlightCssLink.defaultProps = {
  highlight: '',
};

export default HighlightCssLink;
