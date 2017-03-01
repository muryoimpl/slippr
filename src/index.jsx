import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import routes from './routes'
import { configureStore } from './stores'
import * as Settings from './constants/settings'

const initialState = {
  headers: {
    fullscreen: false
  },
  pages: {
    markdownPages: [],
    idx: 0,
    blink: false
  },
  themes: {
    selected: 'theBridge'
  },
  codeStyles: {
    selected: 'default'
  },
  aspectRatio: {
    ratio: Settings.ASPECT_RATIO[0].value
  }
}
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={ store }>
    { routes }
  </Provider>,
  document.getElementById('slippr')
)
