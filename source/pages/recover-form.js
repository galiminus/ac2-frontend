import React, { PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { FormattedMessage } from "react-intl"
import { updatePath } from 'redux-simple-router'

export const fields = ['email']

import {
  TextField,
  FlatButton,
  RaisedButton,
  Snackbar
} from 'material-ui'

import { tokens, users } from "api"
import { currentUser, currentToken } from "action-creators"
import { validateEmail } from "validators"

let authenticate = (fields, dispatch) =>
  tokens.create(fields, dispatch).then((data) => {
    dispatch(currentToken.set(data.access_token))

    users.getMe({}, dispatch).then((data) => {
      dispatch(currentUser.set(data.id))
      dispatch(updatePath("/"))
    })
  })

const validate = values => {
  return {
    email: validateEmail(values.email)
  }
}

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
      fields: { email },
      handleSubmit,
      error
    } = this.props

    return(
      <form onSubmit={handleSubmit(authenticate)}>
        <TextField fullWidth={true} type="email" {...email} hintText={<FormattedMessage id="labels.email" />} />
        <div className="row center-xs" style={{marginTop: "1em"}}>
          <RaisedButton
            disabled={email.invalid}
            type="submit"
            label={<FormattedMessage id="actions.continue" />}
            secondary={true}
            onClick={handleSubmit(authenticate)} />
        </div>
        <Snackbar message={error ? <FormattedMessage id={`errors.${error}`} /> : ""} ref="notice" />
      </form>
    )
  }
})

export default reduxForm({
  form: "login",
  fields: ['email'],
  validate
})(form)
