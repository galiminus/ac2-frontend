import React, { PropTypes } from 'react';

import ProfileBanner from 'components/profile-banner';
import PostsContainer from 'pages/posts/posts-container';

const UserPage = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        children: PropTypes.node
    },

    render() {
        if (this.props.page.type) {
            return (
                <div>
                    <PostsContainer {...this.props} />
                </div>
            );
        } else if (this.props.page.type.match(/^pages.profiles/)) {
            return (
                <div>
                    <ProfileBanner page={this.props.page} />
                    {React.cloneElement(this.props.children, this.props)}
                </div>
            );
        }
        return (<div />);
    }
});

export default UserPage;
