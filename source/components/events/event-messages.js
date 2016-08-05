import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import EventBanner from 'components/events/event-banner';
import MessagesTabs from 'components/messages/messages-tabs';

const EventMessages = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <div>
                <EventBanner page={this.props.resource} />
                <MessagesTabs
                    {...this.props}
                    baseUrl={`/events/${this.props.resource.slug}`}
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
