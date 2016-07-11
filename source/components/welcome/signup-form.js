import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { updatePath } from 'redux-simple-router';
import { dispatch } from 'store';
import { batchActions } from 'redux-batched-actions';

import { Link } from 'react-router';

import CSSModules from 'react-css-modules';
import styles from './signup-form.css';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { tokens, users } from 'api';
import { addToken, setCurrentUser, setCurrentToken, pushNotification } from 'action-creators';
import { validateEmail, validatePassword, validateFullName, validateUserName } from 'validators';

const authenticate = (userId, fields) =>
    tokens.create({ email: fields.email, password: fields.password }, dispatch)
        .then((data) => {
            dispatch(batchActions([
                addToken(data),
                setCurrentUser(userId),
                setCurrentToken(data.access_token),
                updatePath('/')
            ]));
        })
        .catch((error) => {
            if (error.response !== undefined) {
                const authError = error.response.headers.get('www-authenticate');

                if (authError && authError.match('invalid_grant')) {
                    dispatch(pushNotification('invalidGrant'));
                }
            }
        });

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
    }, dispatch)
        .then((userId) => authenticate(userId, fields, dispatch))
        .catch((error) => dispatch(pushNotification(error.value)))

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
        translation: PropTypes.object.isRequired,
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
                <TextField fullWidth type="text" {...fullName} hintText={this.props.translation.t('labels.signup.fullName')} />
                <TextField fullWidth type="text" {...userName} hintText={this.props.translation.t('labels.signup.userName')} />
                <TextField fullWidth type="email" {...email} hintText={this.props.translation.t('labels.signup.email')} />
                <TextField fullWidth type="password" {...password} hintText={this.props.translation.t('labels.signup.password')} />
                <div styleName="actionButtons">
                    <RaisedButton
                        disabled={fullName.invalid || userName.invalid || email.invalid || password.invalid}
                        type="submit"
                        label={this.props.translation.t('actions.signup')}
                        secondary
                        onClick={handleSubmit(signup)}
                    />
                    <Link to="/welcome/login">
                        <FlatButton
                            label={this.props.translation.t('labels.have_account')}
                        />
                    </Link>
                </div>
            </form>
        );
    }
});

export default reduxForm({
    form: 'signup',
    fields: ['fullName', 'userName', 'email', 'password'],
    validate
})(CSSModules(SignupForm, styles));
