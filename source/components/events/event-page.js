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
            <PageContainer factory={EventFactory} id={this.props.params.resourceId} {...this.props} />
        );
    }
});

export default EventPage;
