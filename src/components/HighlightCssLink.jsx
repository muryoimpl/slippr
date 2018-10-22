import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HighlightCssLink extends React.Component {
  render() {
    const { selected } = this.props;

    return (
      <link rel="stylesheet" href={`./node_modules/highlight.js/styles/${selected}.css`} media="screen,print" />
    );
  }
}

HighlightCssLink.propTypes = {
  selected: PropTypes.string,
};

HighlightCssLink.defaultProps = {
  selected: '',
};

export default connect(state => ({
  selected: state.codeStyles.selected,
}))(HighlightCssLink);
