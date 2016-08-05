import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import ResourceForm from 'components/resource-form';

import api from 'api';

const Settings = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <ResourceForm
                type="Setting"
                record={this.context.settings.data}
                only={[this.props.params.category]}
                onRequest={((record) => api.settings.update(this.context.settings.id, { data: record }))}
            />
        );
    }
});

export default Settings;
