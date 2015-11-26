import React from "react";
import { connect } from "react-redux"
import { FormattedMessage } from "react-intl"

import {
  Toolbar,
  ToolbarGroup,
  Paper,
  FlatButton,
  Modal
} from 'material-ui'
import { Link } from "react-router"

import ToolbarLogo from "components/toolbar-logo"
import { toolbarBackgroundColor, loginPageBackground } from "config"

function mapStateToProps(state) {
  return {
    isLoggedIn: state.currentUser !== null,
    currentPath: state.routing.path
  }
}

let LoginPage = (props) => {
  let formTitle;
  switch (props.currentPath) {
    case "/welcome/login":
      formTitle = "login"
      break ;

    case "/welcome/signup":
      formTitle = "signup"
      break ;

    case "/welcome/recover":
      formTitle = "recover"
      break ;
  }

  return (
    <div style={{background: loginPageBackground, height: "100%", width: "100%", position: "fixed"}}>
      <Toolbar style={{backgroundColor: toolbarBackgroundColor}}>
        <ToolbarGroup key={0}>
          <ToolbarLogo />
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
        </ToolbarGroup>
      </Toolbar>

      <div className="row middle-xs center-xs" style={{height: "100%"}}>
        <Paper className="col-md-3 col-sm-8 col-xs-11" style={{padding: "16px 32px 32px 32px"}}>
          <h3 style={{marginBottom: 32, fontWeight: 200, fontSize: 14, textTransform: "uppercase"}}>
            <FormattedMessage id={`forms.${formTitle}`} />
          </h3>
          {props.children}
        </Paper>
      </div>
   </div>
  )
}

export default connect(mapStateToProps)(LoginPage)
