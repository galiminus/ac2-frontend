import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { typeToShortPluralType } from 'utils/types';

import { connect } from 'react-redux';

import Form from 'components/form';

import actionCreators from 'action-creators';
import api from 'api';

function mapStateToProps(state, props) {
    return ({
        schema: state.schemaByModel.get(props.type)
    });
}

const PageCreateForm = React.createClass({
    propTypes: {
        type: PropTypes.string.isRequired,
        onSubmit: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        pushNotification: PropTypes.func.isRequired,
        schema: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return ({ record: {} });
    },

    handleSubmit(data) {
        return (
            api.pages.create(this.props.type, { data })
                .then(
                    (resource) => {
                        this.props.addResource(resource);
                        this.props.pushNotification('saveSuccess');
                        this.props.onSubmit(resource);
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
                editable
                label={typeToShortPluralType(this.props.type)}
                loading={this.state.loading}
                schema={this.props.schema.data}
                onSubmit={this.handleSubmit}
                record={this.state.record}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(PageCreateForm);
