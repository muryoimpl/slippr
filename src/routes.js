import React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';

import * as components from './components';

const {
  App,
  Home,
  Page,
} = components;

export default (
  <Router>
    <Switch>
      <App>
        <Route path="" component={Home} />
        <Route path="/pages/:idx" component={Page} />
      </App>
    </Switch>
  </Router>
);
