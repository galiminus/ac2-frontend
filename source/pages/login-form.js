import React, { PropTypes } from "react";
import { reduxForm } from "redux-form";
import { dispatch } from "store";
import { updatePath } from "redux-simple-router";

import {
    TextField,
    FlatButton,
    RaisedButton
} from "material-ui";

import { tokens } from "api";
import { currentToken } from "action-creators";
import { validateEmail, validatePassword } from "validators";

const authenticate = (fields) =>
    tokens.create(fields, dispatch).then((data) => {
        dispatch(currentToken.set(data.access_token));
        dispatch(updatePath("/"));
    });

const validate = values => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password)
    };
};

const form = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        translations: PropTypes.object.isRequired,
        error: PropTypes.string
    },

    goToSignupForm(e) {
        dispatch(updatePath("/welcome/signup"));
        e.preventDefault();
    },

    goToRecoverForm(e) {
        dispatch(updatePath("/welcome/recover"));
        e.preventDefault();
    },

    render() {
        const {
            fields: { email, password },
            handleSubmit
        } = this.props;

        return (
            <form onSubmit={handleSubmit(authenticate)}>
                <TextField fullWidth type="email" {...email} hintText={this.props.translations.t("labels.login.email")} />
                <TextField fullWidth type="password" {...password} hintText={this.props.translations.t("labels.login.password")} />
                <div className="row between-md between-xs center-xs" style={{ marginTop: 32 }}>
                    <RaisedButton
                        disabled={email.invalid || password.invalid}
                        type="submit"
                        label={this.props.translations.t("actions.login")}
                        secondary
                        onClick={handleSubmit(authenticate)}
                    />
                    <FlatButton label={this.props.translations.t("labels.signup.signup")} linkButton href="/welcome/signup" onClick={this.goToSignupForm} />
                </div>
                <div className="row center-xs">
                    <FlatButton
                        style={{ fontSize: "0.7em", marginTop: 32 }}
                        label={this.props.translations.t("labels.recover")}
                        secondary={false}
                        linkButton
                        href="/welcome/recover"
                        onClick={this.goToRecoverForm}
                    />
                </div>
            </form>
        );
    }
});

export default reduxForm({
    form: "login",
    fields: ["email", "password"],
    validate
})(form);
