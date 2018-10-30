import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './stores/timer';
import TimerApp from './containers/TimerWindow';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <TimerApp />
  </Provider>,
  document.getElementById('slippr-timer'),
);
