import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import { batchActions } from 'redux-batched-actions';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import api from 'api';
import { addResource } from 'action-creators';
import { validateText } from 'validators';

import PageCardHeader from 'components/page-card-header';

const validate = values => {
    return {
        body: validateText(values.body)
    };
};

const form = React.createClass({
    propTypes: {
        sender: PropTypes.object,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        error: PropTypes.string,
        id: PropTypes.string
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    post(fields, dispatch) {
        api.comments.update(this.props.id, {
            type: 'text',
            data: {
                body: fields.body
            }
        }).then((response) => {
            dispatch(addResource(response));
            this.props.onRequestClose();
        });
    },

    render() {
        const {
            fields: { body },
            handleSubmit
        } = this.props;

        if (!body.value) {
            body.value = '';
        }

        return (
            <Dialog
                {...this.props}
                title={
                    <PageCardHeader sender={this.props.sender} />
                }
                actions={[
                    <FlatButton
                        label={this.context.translation.t('actions.cancel')}
                        onClick={this.props.onRequestClose}
                    />,
                    <FlatButton
                        disabled={body.invalid}
                        type="submit"
                        label={this.context.translation.t('actions.post')}
                        secondary
                        onClick={handleSubmit(this.post)}
                    />
                ]}
            >
                <TextField
                    fullWidth
                    type="text"
                    multiLine
                    rows={5}
                    {...body}
                />
            </Dialog>
        );
    }
});

export default reduxForm({
    form: 'comment',
    fields: ['body'],
    validate
})(form);
