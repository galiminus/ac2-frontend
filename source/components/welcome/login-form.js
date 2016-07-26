import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import PureRenderMixin from 'components/pure-render-mixin';

import { dispatch } from 'store';
import { updatePath } from 'redux-simple-router';
import { batchActions } from 'redux-batched-actions';

import Link from 'components/link';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { tokens } from 'api';
import { addToken, setCurrentToken, pushNotification } from 'action-creators';
import { validateEmail, validatePassword } from 'validators';

const style = {
    button: {
        display: 'block',
        textAlign: 'center',
        width: '100%',
        marginTop: 8
    },

    passwordRecoverButton: {
        marginTop: 8
    }
};

const authenticate = (fields) =>
    tokens.create(fields, dispatch)
        .then(
            (data) => {
                dispatch(batchActions([
                    addToken(data),
                    setCurrentToken(data.access_token),
                    updatePath('/')
                ]));
            },
            (error) => {
                if (error.response !== undefined) {
                    const authError = error.response.headers.get('www-authenticate');

                    if (authError && authError.match('invalid_grant')) {
                        dispatch(pushNotification('invalidGrant'));
                    }
                }
            }
        );

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

    mixins: [PureRenderMixin],

    render() {
        const {
            fields: { email, password },
            handleSubmit
        } = this.props;

        return (
            <form onSubmit={handleSubmit(authenticate)}>
                <TextField
                    fullWidth
                    type="email"
                    value={email.value}
                    onChange={email.onChange}
                    hintText={this.context.translation.t('labels.login.email')}
                />
                <TextField
                    fullWidth
                    type="password"
                    value={password.value}
                    onChange={password.onChange}
                    hintText={this.context.translation.t('labels.login.password')}
                />
                <RaisedButton
                    style={style.button}
                    disabled={email.invalid || password.invalid}
                    type="submit"
                    label={this.context.translation.t('actions.login')}
                    secondary
                    onClick={handleSubmit(authenticate)}
                />
                <Link to="/welcome/signup" fullWidth>
                    <FlatButton
                        style={style.button}
                        label={this.context.translation.t('labels.signup.signup')}
                    />
                </Link>

                <div style={style.passwordRecoverButton}>
                    <Link to="/welcome/recover" fullWidth>
                        <FlatButton
                            style={style.button}
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
})(LoginForm);
