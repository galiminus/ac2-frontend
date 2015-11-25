import React from "react";
import { connect } from "react-redux"
import {
  Toolbar,
  ToolbarGroup,
  Paper,
  FlatButton,
  Modal
} from 'material-ui'
import { FormattedMessage } from "react-intl"
import { Link } from "react-router"

import LoginForm from "components/login-form"
import SignupForm from "components/signup-form"

import ToolbarLogo from "components/toolbar-logo"
import { toolbarBackgroundColor, loginPageBackground } from "config"

function mapStateToProps(state) {
  return { isLoggedIn: state.currentUser !== null }
}

let LoginPage = (props) => {
  return (
    <div style={{background: loginPageBackground, height: "100%", width: "100%", position: "fixed"}}>
      <Toolbar style={{backgroundColor: toolbarBackgroundColor}}>
        <ToolbarGroup key={0}>
          <ToolbarLogo />
        </ToolbarGroup>
      </Toolbar>

      <div className="row middle-xs middle-md between-xs" style={{height: "100%"}}>
        <div className="col-md-4 col-md-offset-7 col-xs-10 col-xs-offset-1">
          <div className="col">
            <Paper className="col-md-12" style={{padding: "1em"}}>
              <LoginForm />
           </Paper>
           <Paper className="col-md-12" style={{padding: "1em"}}>
             <SignupForm />
          </Paper>
        </div>
      </div>
     </div>
   </div>
  )
}

export default connect(mapStateToProps)(LoginPage)
