import React from "react"
import { Router, Route } from 'react-router'

import HomePage from "components/home-page"
import LoginPage from "components/login-page"

export default React.createClass({
  render: function() {
    return (
      <Router>
        <Route path="/login" component={LoginPage} />
        <Route path="/" component={HomePage} />
      </Router>
    );
  }
})
