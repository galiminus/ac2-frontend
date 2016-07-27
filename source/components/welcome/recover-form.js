import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import PureRenderMixin from 'components/pure-render-mixin';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import api from 'api';
import { setCurrentToken, setCurrentUser } from 'action-creators';
import { validateEmail } from 'validators';

const style = {
    button: {
        display: 'block',
        textAlign: 'center',
        width: '100%',
        marginTop: 8
    }
};

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
                <RaisedButton
                    style={style.button}
                    disabled={email.invalid}
                    type="submit"
                    label={this.context.translation.t('actions.continue')}
                    secondary
                    onClick={handleSubmit(authenticate)}
                />
            </form>
        );
    }
});

export default reduxForm({
    form: 'recover',
    fields: ['email'],
    validate
})(RecoverForm);
