import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from './stores/child'
import ChildApp from './components/subwindow/ChildApp'
import * as Settings from './constants/settings'

const initialState = {
  timers: {
    limit: Settings.DEFAULT_TIMER_VALUE
  }
}

const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={ store }>
    <ChildApp />
  </Provider>,
  document.getElementById('slippr-child')
)
