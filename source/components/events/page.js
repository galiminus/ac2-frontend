import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Event from 'components/events/event';
import PageContainer from 'components/pages/page-container';

const EventFactory = React.createFactory(Event);

const EventPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <PageContainer
                factory={EventFactory}
                id={this.props.params.resourceId}
                {...this.props}
            />
        );
    }
});

export default EventPage;
