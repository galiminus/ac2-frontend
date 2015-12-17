import React, { PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { FormattedMessage } from "react-intl"
import { dispatch } from "store"
import { updatePath } from 'redux-simple-router'

export const fields = ['email', 'password']

import {
    TextField,
    FlatButton,
    RaisedButton
} from 'material-ui'

import { tokens } from "api"
import { currentToken, actionCableConsumers } from "action-creators"
import { validateEmail, validatePassword } from "validators"

const authenticate = (fields, dispatch) =>
    tokens.create(fields, dispatch).then((data) => {
        dispatch(currentToken.set(data.access_token))
        dispatch(updatePath("/"))
    })

const validate = values => {
    return {
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

    goToSignupForm(e) {
        dispatch(updatePath("/welcome/signup"))
        e.preventDefault()
    },

    goToRecoverForm(e) {
        dispatch(updatePath("/welcome/recover"))
        e.preventDefault()
    },

    render: function() {
        const {
            fields: { email, password },
            handleSubmit
        } = this.props

        return(
            <form onSubmit={handleSubmit(authenticate)}>
                <TextField fullWidth={true} type="email" {...email} hintText={<FormattedMessage id="labels.login.email" />} />
                <TextField fullWidth={true} type="password" {...password} hintText={<FormattedMessage id="labels.login.password" />} />
                <div className="row between-md between-xs center-xs" style={{marginTop: 32}}>
                    <RaisedButton
                        disabled={email.invalid || password.invalid}
                        type="submit"
                        label={<FormattedMessage id="actions.login" />}
                        secondary={true}
                        onClick={handleSubmit(authenticate)} />
                    <FlatButton label={<FormattedMessage id="labels.signup.signup" />} linkButton={true} href="/welcome/signup" onClick={this.goToSignupForm} />
                </div>
                <div className="row center-xs">
                    <FlatButton
                        style={{fontSize: "0.7em", marginTop: 32}}
                        label={<FormattedMessage id="labels.recover" />}
                        secondary={false}
                        linkButton={true}
                        href="/welcome/recover"
                        onClick={this.goToRecoverForm} />
                </div>
            </form>
        )
    }
})

export default reduxForm({
    form: "login",
    fields: ['email', 'password'],
    validate
})(form)
