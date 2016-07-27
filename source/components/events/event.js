import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import api from 'api';

import EventBanner from 'components/events/event-banner';

import actionCreators from 'action-creators';
import PageEditForm from 'components/pages/page-edit-form';

const Event = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.resource.title);
    },

    render() {
        return (
            <div style={{ marginTop: 16 }}>
                <EventBanner page={this.props.resource} />
                <PageEditForm
                    resource={this.props.resource}
                    editable={this.props.resource.permissions.update}
                />
            </div>
        );
    }
});

export default connect(undefined, actionCreators)(Event);
