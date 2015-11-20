import React from "react";
import { connect } from "react-redux"
import {
  Toolbar,
  ToolbarGroup,
  Paper,
  FlatButton
} from 'material-ui'

import LoginForm from "components/login-form"
import ToolbarLogo from "components/toolbar-logo"
import { toolbarBackgroundColor, loginPageBackground } from "config"

function mapStateToProps(state) {
  return { isLoggedIn: state.tokens.count() > 0 }
}

let LoginPage = (props) => {
  return (
    <div className="fill" style={{background: loginPageBackground}}>
      <Toolbar style={{backgroundColor: toolbarBackgroundColor}}>
        <ToolbarGroup key={0}>
          <ToolbarLogo />
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          <FlatButton label="À propos" />
        </ToolbarGroup>
      </Toolbar>

      <div className="row middle-xs middle-md" style={{height: "70%"}}>
        <Paper className="col-md-4 col-md-offset-7 col-xs-10 col-xs-offset-1" style={{padding: "2em"}}>
          <LoginForm />
       </Paper>
     </div>
   </div>
  )
}

export default connect(mapStateToProps)(LoginPage)
