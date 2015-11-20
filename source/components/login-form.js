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
  tokens.create(fields, dispatch).then((data) => {
    users.findMe(data, dispatch).then((data) => {
      dispatch(currentUser.set(data.id))
      dispatch(updatePath("/"))
    })
  })

let form = React.createClass({
  propTypes: {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  },
  render: function() {
    const {
      fields: { email, password },
      handleSubmit,
      error
    } = this.props

    return(
      <form onSubmit={handleSubmit(authenticate)}>
        <TextField fullWidth={true} type="email" {...email} hintText={<FormattedMessage id="label.email" />} />
        <TextField fullWidth={true} type="password" {...password} hintText={<FormattedMessage id="label.password" />} />
        <div className="row between-md between-xs center-xs">
          <FlatButton
            label={<FormattedMessage id="actions.goToPasswordRecovery" />}
            secondary={false} />
          <FlatButton
            type="submit"
            label={<FormattedMessage id="actions.login" />}
            secondary={true}
            onTouchTap={handleSubmit(authenticate)} />
        </div>
        <Snackbar message={error || ""} ref="notice" />
      </form>
    )
  }
})

export default reduxForm({
  form: "login",
  fields: ['email', 'password']
})(form)
