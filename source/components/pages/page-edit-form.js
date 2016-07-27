import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { typeToShortPluralType } from 'utils/types';

import { connect } from 'react-redux';

import Form from 'components/form';

import actionCreators from 'action-creators';
import api from 'api';

function mapStateToProps(state, props) {
    return ({
        schema: state.schemaByModel.get(props.resource.type)
    });
}

const PageEditForm = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired,
        pushNotification: PropTypes.func.isRequired,
        schema: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return ({
            record: this.props.resource.data
        });
    },

    handleSubmit(data) {
        return (
            api.pages.update(this.props.resource.id, { data })
                .then(
                    (resource) => {
                        this.props.addResource(resource);
                        this.props.pushNotification('saveSuccess');
                    },
                    () => {
                        this.props.pushNotification('saveError');
                    }
                )
        );
    },

    render() {
        return (
            <Form
                label={typeToShortPluralType(this.props.resource.type)}
                loading={this.state.loading}
                editable={this.props.editable}
                schema={this.props.schema.data}
                onSubmit={this.handleSubmit}
                record={this.state.record}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(PageEditForm);
