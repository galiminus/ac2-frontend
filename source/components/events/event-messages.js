import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import EventBanner from 'components/events/event-banner';
import MessagesContainer from 'components/messages/messages-container';

const EventMessages = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <div>
                <EventBanner page={this.props.resource} />
                <MessagesContainer
                    {...this.props}
                    formType="Message::Post"
                    page={this.props.resource}
                    sort={[
                        '-updated_at'
                    ]}
                    filters={{
                        participant_id: this.props.resource.id
                    }}
                    include={[
                        'received_likes',
                        'sender',
                        'recipient',
                        'comments',
                        'comments.received_likes',
                        'comments.received_likes.page'
                    ]}
                />
            </div>
        );
    }
});

export default EventMessages;
