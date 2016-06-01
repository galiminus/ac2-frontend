import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { dispatch } from 'store';
import { updatePath } from 'redux-simple-router';

import CSSModules from 'react-css-modules';
import styles from './login-form.css';

import {
    TextField,
    FlatButton,
    RaisedButton
} from 'material-ui';

import { tokens } from 'api';
import { setCurrentToken } from 'action-creators';
import { validateEmail, validatePassword } from 'validators';

const authenticate = (fields) =>
    tokens.create(fields, dispatch).then((data) => {
        dispatch([
            setCurrentToken(data.access_token),
            updatePath('/')
        ]);
    });

const validate = values => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password)
    };
};

const LoginForm = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    goToSignupForm(e) {
        dispatch(updatePath('/welcome/signup'));
        e.preventDefault();
    },

    goToRecoverForm(e) {
        dispatch(updatePath('/welcome/recover'));
        e.preventDefault();
    },

    render() {
        const {
            fields: { email, password },
            handleSubmit
        } = this.props;

        return (
            <form onSubmit={handleSubmit(authenticate)}>
                <TextField fullWidth type="email" {...email} hintText={this.context.translation.t('labels.login.email')} />
                <TextField fullWidth type="password" {...password} hintText={this.context.translation.t('labels.login.password')} />
                <div styleName="actionButtons">
                    <RaisedButton
                        disabled={email.invalid || password.invalid}
                        type="submit"
                        label={this.context.translation.t('actions.login')}
                        secondary
                        onClick={handleSubmit(authenticate)}
                    />
                    <FlatButton
                        label={this.context.translation.t('labels.signup.signup')}
                        linkButton
                        href="/welcome/signup"
                        onClick={this.goToSignupForm}
                    />
                </div>

                <div styleName="passwordRecoverButton">
                    <FlatButton
                        labelStyle={{ fontSize: 12, color: '#999' }}
                        label={this.context.translation.t('labels.recover')}
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
    form: 'login',
    fields: ['email', 'password'],
    validate
})(CSSModules(LoginForm, styles));
