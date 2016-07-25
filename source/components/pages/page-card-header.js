import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { CardHeader } from 'material-ui/Card';

import ArrowIcon from 'material-ui/svg-icons/av/play-arrow';

import PageAvatar from 'components/pages/page-avatar';
import PageLink from 'components/pages/page-link';

const PageCardHeader = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        recipient: PropTypes.object,
        children: PropTypes.node,
        additionalInfos: PropTypes.node,
        subtitle: PropTypes.node
    },

    mixins: [PureRenderMixin],

    renderSender() {
        return (
            <div>
                <PageLink page={this.props.sender} />
                {this.props.additionalInfos}
            </div>
        );
    },

    renderSenderWithRecipient() {
        return (
            <div>
                <PageLink page={this.props.sender} />
                <ArrowIcon style={{ width: 10, height: 10 }} />
                <PageLink page={this.props.recipient} />
                {this.props.additionalInfos}
            </div>
        );
    },

    render() {
        return (
            <CardHeader
                title={this.props.recipient ? this.renderSenderWithRecipient() : this.renderSender()}
                avatar={
                    <PageAvatar page={this.props.sender} />
                }
                subtitle={this.props.subtitle}
                children={this.props.children}
            />
        );
    }
});

export default PageCardHeader;
