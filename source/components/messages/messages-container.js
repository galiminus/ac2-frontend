import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import api from 'api';

import ResourcesContainer from 'components/resources-container';
import Messages from 'components/messages/messages';

const MessagesFactory = React.createFactory(Messages);

const MessagesContainer = React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourcesContainer {...this.props}
                factory={MessagesFactory}
                find={api.messages.find}
                storeName="messages"
            />
        );
    }
});

export default MessagesContainer;
