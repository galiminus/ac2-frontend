import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import ProfileBanner from 'components/profiles/profile-banner';
import MessagesContainer from 'components/messages/messages-container';

const GroupMessages = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <div>
                <ProfileBanner page={this.props.resource} />
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

export default GroupMessages;
