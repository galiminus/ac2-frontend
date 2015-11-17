import React from "react";
import { connect } from "react-redux"
import {
  Toolbar,
  ToolbarGroup,
  Paper,
  FlatButton
} from 'material-ui'
import { FormattedMessage } from "react-intl"
import { bindActionCreators } from "redux"

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

import LoginForm from "components/login-form"

import api from "api"

function mapStateToProps(state) {
  return { isLoggedIn: !!state.token.data.access_token }
}

let authenticate = (fields) => api.actions.token.create(fields)

function mapDispatchToProps(dispatch) {
  return bindActionCreators({authenticate}, dispatch)
}

let LoginPage = (props) => {
  return (
    <div>
      <Toolbar>
        <ToolbarGroup key={1} float="right">
          <FlatButton label="À propos" />
        </ToolbarGroup>
      </Toolbar>

      <div className="row">

        <aside className="col-lg-6">
        </aside>

        <section className="col-lg-3">
          <LoginForm onSubmit={props.authenticate} />
       </section>
     </div>
   </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
