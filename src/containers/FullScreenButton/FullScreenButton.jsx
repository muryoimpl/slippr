import React from 'react';
import PropTypes from 'prop-types';
import { ipcRenderer } from 'electron';

class FullScreenButton extends React.Component {
  handleNormalScreen() {
    const { router } = this.context;
    const { setFullScreen, clearPages } = this.props;
    setFullScreen(false);
    clearPages();
    router.history.push('/');
    ipcRenderer.send('normal-screen');
  }

  render() {
    return (
      <button type="button" className="c-footer-btn__center ma" onClick={() => this.handleNormalScreen()} title="Finish full screen">
        <span className="icon icon-down-bold" />
      </button>
    );
  }
}

FullScreenButton.propTypes = {
  setFullScreen: PropTypes.func.isRequired,
  clearPages: PropTypes.func.isRequired,
};

export default FullScreenButton;
