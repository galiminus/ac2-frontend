import React, { PropTypes } from "react";
import { reduxForm } from "redux-form";
import { updatePath } from "redux-simple-router";

import {
    TextField,
    RaisedButton
} from "material-ui";

import { tokens, users } from "api";
import { currentUser, currentToken } from "action-creators";
import { validateEmail } from "validators";

const authenticate = (fields, dispatch) =>
tokens.create(fields, dispatch).then((accessTokenData) => {
    dispatch(currentToken.set(accessTokenData.access_token));

    users.me({}, dispatch).then((userData) => {
        dispatch(currentUser.set(userData.id));
        dispatch(updatePath("/"));
    });
});

const validate = values => {
    return {
        email: validateEmail(values.email)
    };
};

const form = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        translations: PropTypes.object.isRequired,
        error: PropTypes.string
    },

    render() {
        const {
            fields: { email },
            handleSubmit
            // error
        } = this.props;

        return (
            <form onSubmit={handleSubmit(authenticate)}>
                <TextField fullWidth type="email" {...email} hintText={this.props.translations.t("labels.recover.email")} />
                <div className="row center-xs" style={{ marginTop: "1em" }}>
                    <RaisedButton
                        disabled={email.invalid}
                        type="submit"
                        label={this.props.translations.t("actions.continue")}
                        secondary
                        onClick={handleSubmit(authenticate)}
                    />
                </div>
            </form>
        );
    }
});

export default reduxForm({
    form: "login",
    fields: ["email"],
    validate
})(form);
