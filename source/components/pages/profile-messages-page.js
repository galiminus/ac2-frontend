import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import PageContainer from './page-container';
import ProfileMessages from 'components/profile/profile-messages';

const ProfileMessagesFactory = React.createFactory(ProfileMessages);

const ProfileMessagesPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <PageContainer factory={ProfileMessagesFactory} id={this.props.params.pageId} {...this.props} />
        );
    }
});

export default ProfileMessagesPage;