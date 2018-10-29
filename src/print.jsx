import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './stores/print';
import PrintWindow from './containers/PrintWindow';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PrintWindow />
  </Provider>,
  document.getElementById('slippr-print'),
);
