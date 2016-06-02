import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { updatePath } from 'redux-simple-router';

import {
    TextField,
    RaisedButton
} from 'material-ui';

import api from 'api';
import { setCurrentToken, setCurrentUser } from 'action-creators';
import { validateEmail } from 'validators';

const authenticate = (fields, dispatch) =>
api.tokens.create(fields, dispatch).then((accessTokenData) => {
    dispatch(setCurrentToken(accessTokenData.access_token));

    api.users.me({}, dispatch).then((userData) => {
        dispatch([
            setCurrentUser(userData.id),
            updatePath('/')
        ]);
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
        error: PropTypes.string
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    render() {
        const {
            fields: { email },
            handleSubmit
            // error
        } = this.props;

        return (
            <form onSubmit={handleSubmit(authenticate)}>
                <TextField fullWidth type="email" {...email} hintText={this.context.translation.t('labels.recover.email')} />
                <div style={{ marginTop: '1em' }}>
                    <RaisedButton
                        disabled={email.invalid}
                        type="submit"
                        label={this.context.translation.t('actions.continue')}
                        secondary
                        onClick={handleSubmit(authenticate)}
                    />
                </div>
            </form>
        );
    }
});

export default reduxForm({
    form: 'login',
    fields: ['email'],
    validate
})(form);
