import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PageContainer from 'components/pages/page-container';
import ProfileMessages from 'components/profiles/profile-messages';

const ProfileMessagesFactory = React.createFactory(ProfileMessages);

const ProfileMessagesPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <PageContainer
                {...this.props}
                factory={ProfileMessagesFactory}
                id={this.props.params.resourceId}
                storeName="pages"
            />
        );
    }
});

export default ProfileMessagesPage;
