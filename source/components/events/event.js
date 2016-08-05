import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import EventBanner from 'components/events/event-banner';

import PageEditForm from 'components/pages/page-edit-form';

const Event = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <div>
                <EventBanner page={this.props.resource} />
                <PageEditForm
                    resource={this.props.resource}
                    editable={this.props.resource.permissions.update}
                />
            </div>
        );
    }
});

export default Event;
