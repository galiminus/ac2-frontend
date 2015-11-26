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

let authenticate = (fields, dispatch) =>
  tokens.create(fields, dispatch).then((data) => {
    dispatch(currentToken.set(data.access_token))

    users.findMe({}, dispatch).then((data) => {
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

  componentWillReceiveProps(props) {
    if (props.error) {
      this.refs.notice.show()
    }
  },

  render: function() {
    const {
      fields: { email, password },
      handleSubmit,
      error
    } = this.props

    return(
      <form onSubmit={handleSubmit(authenticate)}>
        <TextField fullWidth={true} type="email" {...email} hintText={<FormattedMessage id="labels.email" />} />
        <TextField fullWidth={true} type="password" {...password} hintText={<FormattedMessage id="labels.password" />} />
        <div className="row between-md between-xs center-xs" style={{marginTop: 32}}>
          <RaisedButton
            disabled={true}
            type="submit"
            label={<FormattedMessage id="actions.login" />}
            secondary={true}
            onTouchTap={handleSubmit(authenticate)} />
          <FlatButton label={<FormattedMessage id="labels.signup" />} linkButton={true} href="#/welcome/signup" />
        </div>
        <div className="row center-xs">
          <FlatButton
            style={{fontSize: "0.7em", marginTop: 32}}
            label={<FormattedMessage id="labels.recover" />}
            secondary={false}
            linkButton={true}
            href="#/welcome/recover" />
        </div>
        <Snackbar message={error ? <FormattedMessage id={`errors.${error}`} /> : ""} ref="notice" />
      </form>
    )
  }
})

export default reduxForm({
  form: "login",
  fields: ['email', 'password']
})(form)
