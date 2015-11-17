import React, { PropTypes } from "react"
import {reduxForm} from 'redux-form'
import { FormattedMessage, injectIntl } from "react-intl"
import Immutable from 'immutable'
export const fields = ['email', 'password']

import {
  TextField,
  FlatButton
} from 'material-ui'

let form = React.createClass({
  propTypes: {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  },
  render: function() {
    const {
      fields: { email, password },
      handleSubmit
    } = this.props

    return(
      <form onSubmit={handleSubmit}>
          <TextField fullWidth={true} type="email" {...email} hintText={<FormattedMessage id="label.email" />} />
          <TextField fullWidth={true} type="password" {...password} hintText={<FormattedMessage id="label.password" />} />
          <FlatButton
            label={<FormattedMessage id="actions.goToPasswordRecovery" />}
            secondary={false} />
          <FlatButton
            type="submit"
            label={<FormattedMessage id="actions.login" />}
            secondary={true}
            onTouchTap={handleSubmit} />
      </form>
    )
  }
})

export default reduxForm({
  form: "login",
  fields: ['email', 'password']
})(form)
