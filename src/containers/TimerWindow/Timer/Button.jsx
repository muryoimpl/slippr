import React from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';

const Button = ({ started, onClick, label }) => (
  <button
    type="button"
    className="btn btn-default mgl"
    onClick={() => {
      onClick();
      ipcRenderer.send('stop-timer-in-page');
    }}
    disabled={started}
  >
    { label }
  </button>
);

Button.propTypes = {
  started: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
