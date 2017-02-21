import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from './stores/child'
import ChildApp from './components/subwindow/ChildApp'
import * as Settings from './constants/settings'
import { convertTimeToNumber } from './utils/timeConverter'

let time = convertTimeToNumber(Settings.DEFAULT_TIMER_VALUE)

const initialState = {
  timers: {
    limit: Settings.DEFAULT_TIMER_VALUE,
    minutes: Number(time[0]),
    seconds: Number(time[1]),
    started: false,
    intervalId: null
  }
}

const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={ store }>
    <ChildApp />
  </Provider>,
  document.getElementById('slippr-child')
)
