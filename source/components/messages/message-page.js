import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Message from 'components/messages/message';
import MessageContainer from 'components/messages/message-container';

const MessageFactory = React.createFactory(Message);

const MessagePage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <MessageContainer
                {...this.props}
                factory={MessageFactory}
                id={this.props.params.resourceId}
                storeName="messages"
            />
        );
    }
});

export default MessagePage;
