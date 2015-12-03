import React from "react";
import { connect } from "react-redux"
import { FormattedMessage, FormattedHTMLMessage } from "react-intl"

import {
  ToolbarGroup,
  Paper,
  FlatButton,
  Modal
} from 'material-ui'
import { Link } from "react-router"

import AcToolbar from "components/ac-toolbar"
import { toolbarBackgroundColor, loginPageBackground } from "config"

function mapStateToProps(state) {
  return {
    isLoggedIn: state.currentUser !== null,
    currentPath: state.routing.path
  }
}

const LoginPage = React.createClass({
  getFormTitle() {
    return {
      "/welcome/login": "login",
      "/welcome/signup": "signup",
      "/welcome/recover": "recover"
    }[this.props.currentPath]
  },

  render() {
    return (
      <div style={{background: loginPageBackground, height: "100%", width: "100%", position: "fixed"}}>
        <AcToolbar style={{backgroundColor: toolbarBackgroundColor}}>
          <ToolbarGroup key={1} float="right">
          </ToolbarGroup>
        </AcToolbar>

        <div className="row middle-xs center-xs" style={{height: "100%"}}>
          <Paper className="col-md-4 col-sm-8 col-xs-11" style={{padding: "16px 32px 32px 32px"}}>
            <h3 style={{marginBottom: 32, fontWeight: 200, fontSize: 14, textTransform: "uppercase"}}>
              <FormattedMessage id={`forms.${this.getFormTitle()}`} />
            </h3>
            {this.props.children}
          </Paper>
        </div>
     </div>
    )
  }
})

export default connect(mapStateToProps)(LoginPage)
