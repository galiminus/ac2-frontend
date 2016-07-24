import React, { PropTypes } from 'react';

import Profile from 'components/profile/profile';
import PageContainer from './page-container';

const ProfileFactory = React.createFactory(Profile);

const ProfilePage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    render() {
        return (
            <PageContainer factory={ProfileFactory} id={this.props.params.resourceId} {...this.props} />
        );
    }
});

export default ProfilePage;
