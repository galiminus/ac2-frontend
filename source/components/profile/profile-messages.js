import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import ProfileBanner from 'components/profile/profile-banner';
import MessagesContainer from 'components/messages/messages-container';

const ProfileMessages = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.resource.title);
    },

    render() {
        return (
            <div>
                <ProfileBanner page={this.props.resource} translation={this.props.translation} />
                <MessagesContainer {...this.props} filters={{ participant_id: this.props.resource.id }}/>
            </div>
        );
    }
});

export default connect(undefined, { setTitle })(ProfileMessages);
