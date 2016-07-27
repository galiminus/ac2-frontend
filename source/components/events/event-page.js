import React, { PropTypes } from 'react';

import Event from 'components/events/event';
import PageContainer from 'components/pages/page-container';

const EventFactory = React.createFactory(Event);

const EventPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    render() {
        return (
            <PageContainer
                {...this.props}
                factory={EventFactory}
                id={this.props.params.resourceId}
                storeName="events"
            />
        );
    }
});

export default EventPage;
