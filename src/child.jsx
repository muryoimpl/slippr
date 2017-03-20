import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from './stores/child'
import ChildApp from './components/timerwindow/ChildApp'

const store = configureStore()

ReactDOM.render(
  <Provider store={ store }>
    <ChildApp />
  </Provider>,
  document.getElementById('slippr-child')
)
