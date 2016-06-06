import React, { PropTypes } from 'react';

import ProfileBanner from 'components/profile-banner';
import PostsContainer from 'pages/posts/posts-container';

const UserPage = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired
    },

    render() {
        switch (this.props.page.type) {
        case 'main_pages':
            return (
                <div>
                    <PostsContainer {...this.props} />
                </div>
            );

        case 'profile_pages':
            return (
                <div>
                    <ProfileBanner page={this.props.page} />
                    <PostsContainer {...this.props} />
                </div>
            );

        default:
            return (<div />);
        }

    }
});

export default UserPage;
