import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Profile from 'components/profiles/profile';
import PageContainer from 'components/pages/page-container';

const ProfileFactory = React.createFactory(Profile);

const ProfilePage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <PageContainer
                factory={ProfileFactory}
                id={this.props.params.resourceId}
                {...this.props}
            />
        );
    }
});

export default ProfilePage;
