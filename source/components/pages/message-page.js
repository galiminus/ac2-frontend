import React, { PropTypes } from 'react';

import PageBanner from './page-banner';

const MessagePage = React.createClass({
    propTypes: {
        page: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        children: PropTypes.node
    },

    render() {
        return (
            <div>
                <PageBanner page={this.props.page} translation={this.props.translation} />
                {React.cloneElement(this.props.children, { ...this.props, key: undefined })}
            </div>
        );
    }
});

export default MessagePage;
