import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Paper from 'material-ui/Paper';

import Message from './message';
import MessageCreateForm from 'components/messages/message-create-form';

import Loader from 'components/loader';

const Messages = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired,
        onReload: PropTypes.func.isRequired,
        formType: PropTypes.string.isRequired,
        page: PropTypes.object
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <div>
                <Paper>
                    <MessageCreateForm
                        type={this.props.formType}
                        sender={this.context.currentUserPage}
                        recipient={this.props.page}
                        onSubmit={this.props.onReload}
                    />
                </Paper>
                <Loader {...this.props}>
                    {
                        this.props.resources.valueSeq().map(message =>
                            <Message key={message.id} resource={message} />
                        )
                    }
                </Loader>
            </div>
        );
    }
});

export default Messages;
