import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import Event from 'components/events/event';
import PageContainer from 'components/pages/page-container';
import MainLayout from 'components/main-layout';

const EventFactory = React.createFactory(Event);

const EventPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <MainLayout>
                <PageContainer
                    factory={EventFactory}
                    id={this.props.params.resourceId}
                    {...this.props}
                />
            </MainLayout>
        );
    }
});

export default EventPage;
