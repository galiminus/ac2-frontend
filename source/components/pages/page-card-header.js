import React, { PropTypes } from 'react';
import { CardHeader } from 'material-ui/Card';

import PageAvatar from 'components/pages/page-avatar';
import PageLink from 'components/pages/page-link';

const PageCardHeader = React.createClass({
    propTypes: {
        sender: PropTypes.object,
        recipient: PropTypes.object,
        children: PropTypes.node,
        additionalInfos: PropTypes.node
    },

    render() {
        let title;

        if (this.props.recipient && this.props.recipient.type !== 'Page::Main') {
            title = (
                <div>
                    <PageLink page={this.props.sender} />
                    <span style={{ fontSize: 10, marginLeft: 4, marginRight: 4 }}>►</span>
                    <PageLink page={this.props.recipient} />
                    {this.props.additionalInfos}
                </div>
            );
        } else {
            title = (
                <div>
                    <PageLink page={this.props.sender} />
                    {this.props.additionalInfos}
                </div>
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
