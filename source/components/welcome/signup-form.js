import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import PureRenderMixin from 'components/pure-render-mixin';

import { updatePath } from 'redux-simple-router';
import { dispatch } from 'store';
import { batchActions } from 'redux-batched-actions';

import Link from 'components/link';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { tokens, users } from 'api';
import { addToken, setCurrentUser, setCurrentToken, pushNotification } from 'action-creators';
import { validateEmail, validatePassword, validateFullName, validateUserName } from 'validators';

const style = {
    button: {
        display: 'block',
        textAlign: 'center',
        width: '100%',
        marginTop: 8
    }
};

const authenticate = (userId, fields) =>
    tokens.create({ email: fields.email, password: fields.password }, dispatch)
        .then(
            (data) => {
                dispatch(batchActions([
                    addToken(data),
                    setCurrentUser(userId),
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

const signup = (fields) =>
    users.create({
        email: fields.email,
        password: fields.password,
        type: 'Page::Profile',
        page_attributes: {
            data: {
                personal_informations: {
                    full_name: fields.fullName,
                    user_name: fields.userName
                }
            }
        }
    })
    .then(
        (userId) => {
            authenticate(userId, fields, dispatch);
        },
        (error) => {
            if (error.body.email[0] === 'has already been taken') {
                dispatch(pushNotification('email_already_in_use'));
            } else {
                dispatch(pushNotification('unknown'));
            }
        }
    );
const validate = values => {
    return {
        fullName: validateFullName(values.fullName),
        userName: validateUserName(values.userName),
        email: validateEmail(values.email),
        password: validatePassword(values.password)
    };
};

const SignupForm = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string
    },

    mixins: [PureRenderMixin],

    render() {
        const {
            fields: { fullName, userName, email, password },
            handleSubmit
        } = this.props;

        return (
            <form onSubmit={handleSubmit(signup)}>
                <TextField
                    fullWidth
                    type="text"
                    value={fullName.value}
                    onChange={fullName.onChange}
                    hintText={this.context.translation.t('labels.signup.fullName')}
                />
                <TextField
                    fullWidth
                    type="text"
                    value={userName.value}
                    onChange={userName.onChange}
                    hintText={this.context.translation.t('labels.signup.userName')}
                />
                <TextField
                    fullWidth
                    type="email"
                    value={email.value}
                    onChange={email.onChange}
                    hintText={this.context.translation.t('labels.signup.email')}
                />
                <TextField
                    fullWidth
                    type="password"
                    value={password.value}
                    onChange={password.onChange}
                    hintText={this.context.translation.t('labels.signup.password')}
                />
                <RaisedButton
                    style={style.button}
                    disabled={fullName.invalid || userName.invalid || email.invalid || password.invalid}
                    type="submit"
                    label={this.context.translation.t('actions.signup')}
                    secondary
                    onClick={handleSubmit(signup)}
                />
                <Link to="/welcome/login">
                    <FlatButton
                        style={style.button}
                        label={this.context.translation.t('labels.have_account')}
                    />
                </Link>
            </form>
        );
    }
});

export default reduxForm({
    form: 'signup',
    fields: ['fullName', 'userName', 'email', 'password'],
    validate
})(SignupForm);
