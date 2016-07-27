import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PageContainer from 'components/pages/page-container';
import EventMessages from 'components/events/event-messages';

const EventMessagesFactory = React.createFactory(EventMessages);

const EventMessagesPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <PageContainer
                {...this.props}
                factory={EventMessagesFactory}
                id={this.props.params.resourceId}
                storeName="events"
            />
        );
    }
});

export default EventMessagesPage;
