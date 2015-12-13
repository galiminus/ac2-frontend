import React, { PropTypes } from "react"
import { reduxForm } from 'redux-form'
import { FormattedMessage } from "react-intl"
import { updatePath } from 'redux-simple-router'
import store, { dispatch } from "store"

export const fields = ['email', 'password']

import {
    TextField,
    FlatButton,
    RaisedButton,
    Snackbar
} from 'material-ui'

import { tokens, users } from "api"
import { currentUser, currentToken } from "action-creators"
import { validateEmail, validatePassword, validateFullName, validateUserName } from "validators"

let signup = (fields, dispatch) =>
    users.create({
        email: fields.email,
        password: fields.password,
        page_attributes: {
            data: {
                full_name: fields.full_name,
                user_name: fields.user_name
            }
        }
    }, dispatch)
    .then((userId) => authenticate(userId, fields, dispatch))

let authenticate = (userId, fields, dispatch) =>
    tokens.create({email: fields.email, password: fields.password}, dispatch)
    .then((data) => {
        dispatch(currentUser.set(userId))
        dispatch(currentToken.set(data.access_token))

        dispatch(updatePath("/"))
    })

const validate = values => {
    return {
        full_name: validateFullName(values.full_name),
        user_name: validateUserName(values.user_name),
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

    goToLoginForm(e) {
        dispatch(updatePath("/welcome/login"))
        e.preventDefault()
    },

    render: function() {
        const {
            fields: { full_name, user_name, email, password },
            handleSubmit,
            error
        } = this.props

        return(
            <form onSubmit={handleSubmit(signup)}>
                <TextField fullWidth={true} type="text" {...full_name} hintText={<FormattedMessage id="labels.signup.full_name" />} />
                <TextField fullWidth={true} type="text" {...user_name} hintText={<FormattedMessage id="labels.signup.user_name" />} />
                <TextField fullWidth={true} type="email" {...email} hintText={<FormattedMessage id="labels.signup.email" />} />
                <TextField fullWidth={true} type="password" {...password} hintText={<FormattedMessage id="labels.signup.password" />} />
                <div className="row between-xs center-xs" style={{marginTop: 32}}>
                    <RaisedButton
                        disabled={full_name.invalid || user_name.invalid || email.invalid || password.invalid}
                        type="submit"
                        label={<FormattedMessage id="actions.signup" />}
                        secondary={true}
                        onClick={handleSubmit(signup)} />
                    <FlatButton label={<FormattedMessage id="labels.have_account" />} linkButton={true} href="/welcome/login" onClick={this.goToLoginForm}/>
                </div>
            </form>
        )
    }
})

export default reduxForm({
    form: "signup",
    fields: ['full_name', 'user_name', 'email', 'password'],
    validate
})(form)
