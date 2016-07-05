import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { dispatch } from 'store';
import { updatePath } from 'redux-simple-router';
import { batchActions } from 'redux-batched-actions';

import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './login-form.css';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { tokens } from 'api';
import { addToken, setCurrentToken, pushNotification } from 'action-creators';
import { validateEmail, validatePassword } from 'validators';

const authenticate = (fields) =>
    tokens.create(fields, dispatch)
        .then((data) => {
            try {
                dispatch(batchActions([
                    addToken(data),
                    setCurrentToken(data.access_token),
                    updatePath('/')
                ]));
            } catch (e) {
                console.log(e.message, e.stack);
            }
        })
        .catch((error) => {
            if (error.response !== undefined) {
                const authError = error.response.headers.get('www-authenticate');

                if (authError && authError.match('invalid_grant')) {
                    dispatch(pushNotification('invalidGrant'));
                }
            }
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
                    <Link to="/welcome/signup">
                        <FlatButton
                            label={this.context.translation.t('labels.signup.signup')}
                        />
                    </Link>
                </div>

                <div styleName="passwordRecoverButton">
                    <Link to="/welcome/recover">
                        <FlatButton
                            labelStyle={{ fontSize: 12, color: '#999' }}
                            label={this.context.translation.t('labels.recover')}
                            secondary={false}
                        />
                    </Link>
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