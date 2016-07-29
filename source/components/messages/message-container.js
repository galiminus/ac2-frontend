import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import ResourceContainer from 'components/resource-container';

import api from 'api';

const MessageContainer = React.createClass({
    propTypes: {
        id: PropTypes.string.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourceContainer {...this.props} get={api.messages.get} id={this.props.id} />
        );
    }
});

export default MessageContainer;
