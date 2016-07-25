import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import PureRenderMixin from 'components/pure-render-mixin';

import { batchActions } from 'redux-batched-actions';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import api from 'api';
import { addResource } from 'action-creators';
import { validateText } from 'validators';

import PageCardHeader from 'components/pages/page-card-header';

const validate = values => {
    return {
        body: validateText(values.body)
    };
};

const MessageDialog = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        recipient: PropTypes.object,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        error: PropTypes.string,
        id: PropTypes.string
    },

    mixins: [PureRenderMixin],

    createMessage(fields) {
        let recipientParams = {};
        if (this.props.recipient) {
            recipientParams = { recipient_id: this.props.recipient.id };
        }

        return (
            api.messages.create({
                type: 'text',
                ...recipientParams,
                access_controls_attributes: [{ authorized_party_type: 'All' }],
                data: {
                    body: fields.body
                }
            })
        );
    },

    updateMessage(id, fields) {
        return (
            api.messages.update(id, {
                type: 'text',
                data: {
                    body: fields.body
                }
            })
        );
    },

    message(fields, dispatch) {
        let promise;
        if (this.props.id) {
            promise = this.updateMessage(this.props.id, fields);
        } else {
            promise = this.createMessage(fields);
        }

        promise.then((response) => {
            dispatch(batchActions([
                reset('message'),
                addResource(response)
            ]));
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
                    <PageCardHeader sender={this.props.sender} recipient={this.props.recipient} />
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
                        onClick={handleSubmit(this.message)}
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
    form: 'message',
    fields: ['body'],
    validate
})(MessageDialog);
