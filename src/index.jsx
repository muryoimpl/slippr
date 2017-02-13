import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import routes from './routes'
import { configureStore } from './stores'

const initialState = {
  headers: {
    fullscreen: false
  },
  pages: {
    markdownPages: [],
    idx: 0
  },
  themes: {
    selected: 'theBridge'
  }
}
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={ store }>
    { routes }
  </Provider>,
  document.getElementById('slippr')
)
