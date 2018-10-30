import React from 'react';
import { ipcRenderer } from 'electron';

import TimerContent from './Timer/TimerContent';
import * as keyCodeConst from '../../constants/keyCode';

class TimerApp extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleOnKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleOnKeyDown);
  }

  handleOnKeyDown(e) {
    if (document.activeElement.id !== 'limit' && keyCodeConst.TRANSITION_KEY_CODES.includes(e.keyCode)) {
      ipcRenderer.send('transition-page', { keyCode: e.keyCode });
    }
  }

  render() {
    return (
      <div className="window p-timer">
        <header className="toolbar toolbar-header" />

        <div className="window-content">
          <TimerContent {...this.props} />
        </div>

        <footer className="toolbar toolbar-footer" />
      </div>
    );
  }
}

export default TimerApp;
