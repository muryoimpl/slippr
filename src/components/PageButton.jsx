import React from 'react';
import PropTypes from 'prop-types';

const PageButton = ({ onClick, title, className, iconName, label, disabled }) => (// eslint-disable-line object-curly-newline
  <button type="button" className={`btn btn-default ${className}`} onClick={onClick} title={title} disabled={disabled}>
    <span className={`icon ${iconName} mgr`} />
    { label }
  </button>
);

PageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

PageButton.defaultProps = {
  label: '',
  disabled: false,
  className: '',
  title: '',
};

export default PageButton;
