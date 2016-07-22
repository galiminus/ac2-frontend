import React, { PropTypes } from 'react';
import { reduxForm, reset } from 'redux-form';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { batchActions } from 'redux-batched-actions';

import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import SendIcon from 'material-ui/svg-icons/content/send';

import api from 'api';
import { addResource } from 'action-creators';
import { validateText } from 'validators';

import PageAvatar from 'components/pages/page-avatar';

const validate = values => {
    return {
        body: validateText(values.body)
    };
};

const CommentForm = React.createClass({
    propTypes: {
        fields: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        messageId: PropTypes.string.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        error: PropTypes.string
    },

    mixins: [PureRenderMixin],

    message(fields, dispatch) {
        api.comments.create(this.props.messageId, {
            type: 'text',
            access_controls_attributes: [{ authorized_party_type: 'All' }],
            data: {
                body: fields.body
            }
        }).then((response) => {
            dispatch(batchActions([
                reset('comment'),
                addResource(response)
            ]));
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
            <List>
                <ListItem
                    leftAvatar={<PageAvatar page={this.props.currentUserPage} />}
                    disabled
                    innerDivStyle={{
                        paddingTop: 0,
                        paddingBottom: 0
                    }}
                    primaryText={
                        <TextField
                            multiLine
                            style={{ fontSize: '1em' }}
                            fullWidth
                            type="text"
                            hintText={this.props.translation.t('labels.comment')}
                            value={body.value}
                            onChange={body.onChange}
                        />
                    }
                    rightIconButton={
                        <IconButton onClick={handleSubmit(this.message)} disabled={body.invalid}>
                            <SendIcon />
                        </IconButton>
                    }
                />
            </List>

        );
    }
});

export default reduxForm({
    form: 'comment',
    fields: ['body'],
    validate
})(CommentForm);
