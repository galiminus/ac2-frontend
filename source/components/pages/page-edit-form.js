import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import ResourceForm from 'components/resource-form';

import api from 'api';

const PageEditForm = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourceForm
                {...this.props}
                type={this.props.resource.type}
                record={this.props.resource.data}
                onRequest={(record) => api.pages.update(this.props.resource.id, { data: record }) }
            />
        );
    }
});

export default PageEditForm;
