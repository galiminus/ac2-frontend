import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import Form from 'components/form';

import actionCreators from 'action-creators';
import api from 'api';

const defaultProps = {
    resource: {
        data: {}
    },
    editable: false
};

function mapStateToProps(state, props) {
    return ({
        schema: state.schemaByModel.get(props.model)
    });
}

const PageForm = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired,
        model: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        addResource: PropTypes.func.isRequired,
        editable: PropTypes.bool.isRequired,
        pushNotification: PropTypes.func.isRequired,
        schema: PropTypes.object
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return ({
            record: this.props.resource.data
        });
    },

    componentWillMount() {
        if (!this.props.schema) {
            api.schemas
                .find({ 'filter[model]': this.props.model })
                .then((resources) => {
                    this.props.addResource(resources);
                });
        }
    },

    handleUpdate(data) {
        return (
            api.pages.update(this.props.resource.id, { data })
        );
    },

    handleCreate(data) {
        return (
            api.pages.create(this.props.model, { data })
        );
    },

    handleSubmit(data) {
        return (
            (this.props.resource.id ? this.handleUpdate(data) : this.handleCreate(data))
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
        if (!this.props.schema) {
            return (<div />);
        }

        return (
            <Form
                label={this.props.label}
                loading={this.state.loading}
                editable={this.props.editable}
                schema={this.props.schema.data}
                onSubmit={this.handleSubmit}
                record={this.state.record}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(PageForm);
