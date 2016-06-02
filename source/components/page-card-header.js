import React, { PropTypes } from 'react';
import { CardHeader } from 'material-ui/Card';

import PageAvatar from 'components/page-avatar';
import PageLink from 'components/page-link';

const PageCardHeader = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        recipient: PropTypes.object,
        children: PropTypes.node
    },

    render() {
        let title;
        if (this.props.recipient) {
            title = (
                <div>
                    <PageLink page={this.props.sender} />
                    <span style={{ fontSize: 10, marginLeft: 4, marginRight: 4 }}>►</span>
                    <PageLink page={this.props.recipient} />
                </div>
            );
        } else {
            title = (
                <PageLink page={this.props.sender} />
            );
        }

        return (
            <CardHeader
                title={title}
                avatar={
                    <PageAvatar page={this.props.sender} />
                }
                {...this.props}
            />
        );
    }
});

export default PageCardHeader;
