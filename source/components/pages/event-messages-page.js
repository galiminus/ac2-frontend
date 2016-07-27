import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PageContainer from './page-container';
import EventMessages from 'components/event/event-messages';

const EventMessagesFactory = React.createFactory(EventMessages);

const EventMessagesPage = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <PageContainer factory={EventMessagesFactory} id={this.props.params.resourceId} {...this.props} />
        );
    }
});

export default EventMessagesPage;
