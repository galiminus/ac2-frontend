import React, { PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { FormattedMessage, injectIntl } from "react-intl"
import { updatePath } from 'redux-simple-router'

export const fields = ['email', 'password']

import {
  TextField,
  FlatButton,
  Snackbar
} from 'material-ui'

import { tokens, users } from "api"
import { currentUser } from "action-creators"

let authenticate = (fields, dispatch) =>
  users.create({
    email: fields.email,
    password: fields.password,
    profile: {
      name: fields.name
    }
  }, dispatch).then((data) => {
    dispatch(currentUser.set(data.id))
    dispatch(updatePath("/"))
  })

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
        <TextField fullWidth={true} type="text" {...name} hintText={<FormattedMessage id="label.name" />} />
        <TextField fullWidth={true} type="email" {...email} hintText={<FormattedMessage id="label.email" />} />
        <TextField fullWidth={true} type="password" {...password} hintText={<FormattedMessage id="label.password" />} />
        <div style={{marginTop: "1em"}} className="end-md end-xs">
          <FlatButton
            type="submit"
            label={<FormattedMessage id="actions.signup" />}
            secondary={true}
            onTouchTap={handleSubmit(authenticate)} />
        </div>
        <Snackbar message={error || ""} ref="notice" />
      </form>
    )
  }
})

export default reduxForm({
  form: "signup",
  fields: ['name', 'email', 'password']
})(form)
