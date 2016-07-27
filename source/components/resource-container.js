import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';
import actionCreators from 'action-creators';

function mapStateToProps(state, props) {
    const resource = state[props.storeName].get(props.id);

    if (!resource) {
        return ({});
    }

    return {
        resource,
        schema: state.schemas.get(resource.schema_id)
    };
}

const ResourceContainer = React.createClass({
    propTypes: {
        addResource: PropTypes.func.isRequired,
        pushNotification: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        get: PropTypes.func.isRequired,
        factory: PropTypes.func.isRequired,
        resource: PropTypes.object,
        schema: PropTypes.object
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.load(this.props.id);
    },

    componentWillReceiveProps(newProps) {
        if (newProps.id !== this.props.id) {
            this.load(newProps.id);
        }
    },

    load(id) {
        this.props.get(id)
            .then(
                (response) => {
                    this.props.addResource(response);
                },
                () => {
                    this.props.pushNotification('resource_get_fatal_error');
                }
            );
    },

    render() {
        if (!this.props.resource || !this.props.schema) {
            return (<div />);
        }

        return (
            this.props.factory(
                {
                    ...this.props,
                    resource: this.props.resource,
                    schema: this.props.schema
                }
            )
        );
    }
});

export default connect(mapStateToProps, actionCreators)(ResourceContainer);
