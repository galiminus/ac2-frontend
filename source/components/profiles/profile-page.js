import React, { PropTypes } from 'react';

import Profile from 'components/profiles/profile';
import PageContainer from 'components/pages/page-container';

const ProfileFactory = React.createFactory(Profile);

const ProfilePage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    render() {
        return (
            <PageContainer
                {...this.props}
                factory={ProfileFactory}
                id={this.props.params.resourceId}
                storeName="profiles"
            />
        );
    }
});

export default ProfilePage;
