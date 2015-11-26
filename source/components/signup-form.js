import React, { PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { FormattedMessage } from "react-intl"
import { updatePath } from 'redux-simple-router'

export const fields = ['email', 'password']

import {
  TextField,
  FlatButton,
  RaisedButton,
  Snackbar
} from 'material-ui'

import { tokens, users } from "api"
import { currentUser, currentToken } from "action-creators"
import { validateEmail, validatePassword, validateName } from "validators"

let authenticate = (fields, dispatch) =>
  users.create({
    email: fields.email,
    password: fields.password,
    profile: {
      name: fields.name
    }
  }, dispatch).then((data) => {
    dispatch(currentUser.set(data.id))

    tokens.create({email: fields.email, password: fields.password}, dispatch).then((data) => {
      dispatch(currentToken.set(data.access_token))

      dispatch(updatePath("/"))
    })
  })

const validate = values => {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password)
  }
}

let form = React.createClass({
  propTypes: {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  },
  render: function() {
    const {
      fields: { name, email, password },
      handleSubmit,
      error
    } = this.props

    return(
      <form onSubmit={handleSubmit(authenticate)}>
        <TextField fullWidth={true} type="text" {...name} hintText={<FormattedMessage id="labels.name" />} />
        <TextField fullWidth={true} type="email" {...email} hintText={<FormattedMessage id="labels.email" />} />
        <TextField fullWidth={true} type="password" {...password} hintText={<FormattedMessage id="labels.password" />} />
        <div className="row between-xs center-xs" style={{marginTop: 32}}>
          <RaisedButton
            disabled={name.invalid || email.invalid || password.invalid}
            type="submit"
            label={<FormattedMessage id="actions.signup" />}
            secondary={true}
            onTouchTap={handleSubmit(authenticate)} />
          <FlatButton label={<FormattedMessage id="labels.have_account" />} linkButton={true} href="#/welcome/login" />
        </div>
        <Snackbar message={error || ""} ref="notice" />
      </form>
    )
  }
})

export default reduxForm({
  form: "signup",
  fields: ['name', 'email', 'password'],
  validate
})(form)
