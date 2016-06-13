import React, { PropTypes } from 'react';

import PageBanner from './page-banner';

const MessagePage = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        children: PropTypes.node
    },

    render() {
        return (
            <div>
                <PageBanner page={this.props.page} />
                {React.cloneElement(this.props.children, this.props)}
            </div>
        )
    }
});

export default MessagePage;
