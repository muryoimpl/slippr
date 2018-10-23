import React from 'react';
import PropTypes from 'prop-types';

const HighlightCssLink = ({ selected }) => (
  <link rel="stylesheet" href={`../node_modules/highlight.js/styles/${selected}.css`} media="screen,print" />
);

HighlightCssLink.propTypes = {
  selected: PropTypes.string,
};

HighlightCssLink.defaultProps = {
  selected: '',
};

export default HighlightCssLink;
