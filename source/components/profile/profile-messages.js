import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import ProfileBanner from 'components/profile/profile-banner';
import MessagesContainer from 'components/messages/messages-container';

const ProfileMessages = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.resource.title);
    },

    render() {
        return (
            <div>
                <ProfileBanner page={this.props.resource} />
                <MessagesContainer
                    {...this.props}
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

export default connect(undefined, { setTitle })(ProfileMessages);
