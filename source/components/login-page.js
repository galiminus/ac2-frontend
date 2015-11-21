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

import LoginForm from "components/login-form"
import ToolbarLogo from "components/toolbar-logo"
import { toolbarBackgroundColor, loginPageBackground } from "config"

function mapStateToProps(state) {
  return { isLoggedIn: state.currentUser !== null }
}

let LoginPage = (props) => {
  return (
    <div style={{background: loginPageBackground, height: "100%", width: "100%"}}>
      <Toolbar style={{backgroundColor: toolbarBackgroundColor}}>
        <ToolbarGroup key={0}>
          <ToolbarLogo />
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          <FlatButton
            label={<FormattedMessage id="actions.goToSignupPage" />}
            secondary={false} />
        </ToolbarGroup>
      </Toolbar>

      <div className="row middle-xs middle-md" style={{height: "100%"}}>
        <Paper className="col-md-4 col-md-offset-4 col-xs-10 col-xs-offset-1" style={{padding: "2em"}}>
          <LoginForm />
       </Paper>
     </div>
   </div>
  )
}

export default connect(mapStateToProps)(LoginPage)
