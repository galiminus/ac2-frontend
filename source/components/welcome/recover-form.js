import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { updatePath } from 'redux-simple-router';
import PureRenderMixin from 'components/pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './recover-form.css';

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
        error: PropTypes.string
    },

    mixins: [PureRenderMixin],

    render() {
        const {
            fields: { email },
            handleSubmit
        } = this.props;

        return (
            <form onSubmit={handleSubmit(authenticate)}>
                <TextField
                    fullWidth
                    type="email"
                    value={email.value}
                    onChange={email.onChange}
                    hintText={this.context.translation.t('labels.recover.email')}
                />
                <div styleName="actionButtons">
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
    form: 'recover',
    fields: ['email'],
    validate
})(CSSModules(RecoverForm, styles));
