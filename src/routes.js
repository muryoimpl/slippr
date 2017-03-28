import React from 'react'
import { Router, IndexRoute, Route, hashHistory } from 'react-router'

import * as components from './components'

const {
  App,
  Home,
  Page
} = components

export default (
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path="pages/:idx" component={Page} />
    </Route>
  </Router>
)
