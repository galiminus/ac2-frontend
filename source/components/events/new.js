import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import browserHistory from 'react-router/lib/browserHistory';

import { connect } from 'react-redux';
import { setTitle } from 'action-creators';

import PageCreateForm from 'components/pages/page-create-form';

const EventNew = React.createClass({
    propTypes: {
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.context.translation.t('links.newEvent'));
    },

    handleSubmit(resource) {
        browserHistory.push(`/events/${resource.slug}`);
    },

    render() {
        return (
            <PageCreateForm
                type="Page::Event"
                onSubmit={this.handleSubmit}
            />
        );
    }
});

export default connect(undefined, { setTitle })(EventNew);
