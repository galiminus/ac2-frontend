import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import MessagesContainer from 'components/messages/messages-container';

const PollsPage = React.createClass({
    propTypes: {
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.context.translation.t('links.polls'));
    },

    render() {
        return (
            <MessagesContainer
                {...this.props}
                filters={{
                    type: 'Message::Polls'
                }}
                sort={[
                    '-updated_at'
                ]}
                include={[
                    'received_likes',
                    'sender',
                    'recipient',
                    'comments',
                    'comments.received_likes',
                    'comments.received_likes.page'
                ]}
            />
        );
    }
});

export default connect(undefined, { setTitle })(PollsPage);
