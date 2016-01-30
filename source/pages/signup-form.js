import React, { PropTypes } from "react";
import { reduxForm } from "redux-form";
import { updatePath } from "redux-simple-router";
import { dispatch } from "store";

import {
    TextField,
    FlatButton,
    RaisedButton
} from "material-ui";

import { tokens, users } from "api";
import { setCurrentUser, setCurrentToken } from "action-creators";
import { validateEmail, validatePassword, validateFullName, validateUserName } from "validators";

const authenticate = (userId, fields) =>
    tokens.create({ email: fields.email, password: fields.password }, dispatch)
    .then((data) => {
        dispatch([
            setCurrentUser.set(userId),
            setCurrentToken.set(data.access_token),
            updatePath("/")
        ]);
    });

const signup = (fields) =>
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
    .then((userId) => authenticate(userId, fields, dispatch));

const validate = values => {
    return {
        full_name: validateFullName(values.fullName),
        user_name: validateUserName(values.userName),
        email: validateEmail(values.email),
        password: validatePassword(values.password)
    };
};

const form = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    goToLoginForm(e) {
        dispatch(updatePath("/welcome/login"));
        e.preventDefault();
    },

    render() {
        const {
            fields: { fullName, userName, email, password },
            handleSubmit
        } = this.props;

        return (
            <form onSubmit={handleSubmit(signup)}>
                <TextField fullWidth type="text" {...fullName} hintText={this.context.translation.t("labels.signup.fullName")} />
                <TextField fullWidth type="text" {...userName} hintText={this.context.translation.t("labels.signup.userName")} />
                <TextField fullWidth type="email" {...email} hintText={this.context.translation.t("labels.signup.email")} />
                <TextField fullWidth type="password" {...password} hintText={this.context.translation.t("labels.signup.password")} />
                <div className="row between-xs center-xs" style={{ marginTop: 32 }}>
                    <RaisedButton
                        disabled={fullName.invalid || userName.invalid || email.invalid || password.invalid}
                        type="submit"
                        label={this.context.translation.t("actions.signup")}
                        secondary
                        onClick={handleSubmit(signup)}
                    />
                    <FlatButton label={this.context.translation.t("labels.have_account")} linkButton href="/welcome/login" onClick={this.goToLoginForm} />
                </div>
            </form>
        );
    }
});

export default reduxForm({
    form: "signup",
    fields: ["fullName", "userName", "email", "password"],
    validate
})(form);
