import React, { PropTypes } from "react"
import {reduxForm} from 'redux-form'
import { FormattedMessage, injectIntl } from "react-intl"
export const fields = ['email', 'password']

import {
  TextField,
  FlatButton
} from 'material-ui'

import { tokens, users } from "api"


let authenticate = (fields, dispatch) =>
  tokens.create(fields, dispatch).then((data) => {
    users.findMe(data, dispatch)
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
        <FlatButton
          label={<FormattedMessage id="actions.goToPasswordRecovery" />}
          secondary={false} />
        <FlatButton
          type="submit"
          label={<FormattedMessage id="actions.login" />}
          secondary={true}
          onTouchTap={handleSubmit(authenticate)} />
        {error}
      </form>
    )
  }
})

export default reduxForm({
  form: "login",
  fields: ['email', 'password']
})(form)
