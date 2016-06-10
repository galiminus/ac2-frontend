import React, { PropTypes } from 'react';

import ProfileBanner from 'components/profile-banner';
import MessagesContainer from 'pages/messages/messages-container';

const UserPage = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        children: PropTypes.node
    },

    render() {
        if (this.props.page.type) {
            return (
                <div>
                    <MessagesContainer {...this.props} />
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
