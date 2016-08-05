import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import ResourceForm from 'components/resource-form';

import api from 'api';

const PageCreateForm = React.createClass({
    propTypes: {
        type: PropTypes.string.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourceForm
                {...this.props}
                onRequest={(record) => api.pages.create(this.props.type, { data: record }) }
            />
        );
    }
});

export default PageCreateForm;
