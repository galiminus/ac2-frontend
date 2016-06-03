import React, { PropTypes } from 'react';

import PostsContainer from 'pages/posts/posts-container';

const UserPage = React.createClass({
    render() {
        return (<PostsContainer {...this.props} />);
    }
});

export default UserPage;
