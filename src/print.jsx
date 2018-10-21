import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { configureStore } from './stores/print'
import PrintApp from './components/printwindow/PrintApp'

const store = configureStore()

ReactDOM.render(
  <Provider store={ store }>
    <PrintApp />
  </Provider>,
  document.getElementById('slippr-print')
)
