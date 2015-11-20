import React from "react";
import { connect } from "react-redux"
import {
  Toolbar,
  ToolbarTitle,
  ToolbarGroup,
  Paper,
  FlatButton
} from 'material-ui'

import LoginForm from "components/login-form"
import { title } from "config"

function mapStateToProps(state) {
  return { isLoggedIn: state.tokens.count() > 0 }
}

let LoginPage = (props) => {
  return (
    <div>
      <Toolbar>
        <ToolbarGroup key={0}>
          <ToolbarTitle text={title} />
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          <FlatButton label="À propos" />
        </ToolbarGroup>
      </Toolbar>

      <div className="row">

        <aside className="col-md-6">
        </aside>

        <section className="col-md-3 col-xs-10 col-xs-offset-1">
          <LoginForm />
       </section>
     </div>
   </div>
  )
}

export default connect(mapStateToProps)(LoginPage)
