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
        recipient: PropTypes.object,
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        onRequestClose: PropTypes.func.isRequired,
        error: PropTypes.string,
        id: PropTypes.string
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    createPost(fields) {
        let recipientParams = {};
        if (this.props.recipient) {
            recipientParams = { recipient_id: this.props.recipient.id }
        }

        return (
            api.posts.create({
                type: 'text',
                ...recipientParams,
                access_controls_attributes: [{ authorized_party_type: 'All' }],
                data: {
                    body: fields.body
                }
            })
        );
    },

    updatePost(id, fields) {
        return (
            api.posts.update(id, {
                type: 'text',
                data: {
                    body: fields.body
                }
            })
        );
    },

    post(fields, dispatch) {
        let promise;
        if (this.props.id) {
            promise = this.updatePost(this.props.id, fields);
        } else {
            promise = this.createPost(fields);
        }

        promise.then((response) => {
            dispatch(batchActions([
                reset('post'),
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
    form: 'post',
    fields: ['body'],
    validate
})(form);
