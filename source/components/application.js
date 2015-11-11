import React from "react"
import { Router, Route } from 'react-router'

import Home from "components/home"

export default React.createClass({
  render: function() {
    return (
      <Router>
        <Route path="/" component={Home} />
      </Router>
    );
  }
})
