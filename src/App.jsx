import React from 'react'
import PageEmployeesList from './PageEmployeesList '

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PageEmployee from './PageEmployee';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <PageEmployeesList></PageEmployeesList>
      </Route>
      <Route exact path="/new">
        <PageEmployee></PageEmployee>
      </Route>
    </Switch>
  </Router>
)

export default App
