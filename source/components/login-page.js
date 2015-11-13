import React from "react";
import { connect } from "react-redux"
import {
  TextField,
  FlatButton,
  Dialog,
  Snackbar,
  Toolbar,
  ToolbarGroup,
  Paper
} from 'material-ui'
import { FormattedMessage, injectIntl } from "react-intl"
import { reduxForm } from 'redux-form';

import { createToken } from "action-creators/oauth"

function mapStateToProps(state) {
  return { isLoggedIn: !!state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
    authenticate: => () {

    }
  }
}

let EmailField = injectIntl(({intl}) => {
  return (
    <TextField type="email" floatingLabelText={intl.formatMessage({id: "label.email"})} />
  )
})

let PasswordField = injectIntl(({intl}) => {
  return (
    <TextField type="password" floatingLabelText={intl.formatMessage({id: "label.password"})} />
  )
})

let LoginModal = (props) => {
  const {fields: {email, password}, authenticate} = this.props;

  return (
    <div>
      <Toolbar>
        <ToolbarGroup key={1} float="right">
          <FlatButton label="À propos" />
        </ToolbarGroup>
      </Toolbar>

      <div className="row">

        <aside className="col-lg-6 column">
        </aside>

        <section className="col-lg-4" style={{display: "flex", flexDirection: "column", flexGrow: 1}}>

          <form onSubmit={authenticate}>
            <div className="column">
              <EmailField />
              <PasswordField />
            </div>
            <FlatButton
              label={<FormattedMessage id="actions.goToPasswordRecovery" />}
              secondary={false} />
            <FlatButton
              label={<FormattedMessage id="actions.login" />}
              secondary={true}
              onTouchTap={authenticate} />
          </form>

       </section>
     </div>
  </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
