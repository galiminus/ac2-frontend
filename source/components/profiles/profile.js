import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PageEditForm from 'components/pages/page-edit-form';
import ProfileBanner from 'components/profiles/profile-banner';
import MainLayout from 'components/main-layout';

const Profile = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <MainLayout>
                <ProfileBanner page={this.props.resource} />
                <PageEditForm
                    resource={this.props.resource}
                    editable={this.props.resource.permissions.update}
                />
            </MainLayout>
        );
    }
});

export default Profile;
