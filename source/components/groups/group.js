import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import PageEditForm from 'components/pages/page-edit-form';

const Group = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <div style={{ marginTop: 16 }}>
                <PageEditForm
                    resource={this.props.resource}
                    editable={this.props.resource.permissions.update}
                />
            </div>
        );
    }
});

export default Group;
