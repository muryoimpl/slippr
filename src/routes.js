import React from 'react';
import { Switch, Route, HashRouter as Router } from 'react-router-dom';

import App from './containers/App';
import Home from './containers/Home';
import Page from './containers/Page';

export default (
  <Router>
    <Switch>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/pages/:idx" component={Page} />
      </App>
    </Switch>
  </Router>
);
