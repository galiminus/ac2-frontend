import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { updatePath } from 'redux-simple-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

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

const RecoverForm = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired,
        error: PropTypes.string
    },

    mixins: [PureRenderMixin],

    render() {
        const {
            fields: { email },
            handleSubmit
            // error
        } = this.props;

        return (
            <form onSubmit={handleSubmit(authenticate)}>
                <TextField fullWidth type="email" {...email} hintText={this.props.translation.t('labels.recover.email')} />
                <div style={{ marginTop: '1em' }}>
                    <RaisedButton
                        disabled={email.invalid}
                        type="submit"
                        label={this.props.translation.t('actions.continue')}
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
})(RecoverForm);
