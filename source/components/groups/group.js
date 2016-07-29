import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import actionCreators from 'action-creators';
import PageEditForm from 'components/pages/page-edit-form';

const Group = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.setTitle();
    },

    componentWillReceiveProps() {
        this.setTitle();
    },

    setTitle() {
        this.props.setTitle(this.props.resource.data.base_informations.title);
    },

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

export default connect(undefined, actionCreators)(Group);
