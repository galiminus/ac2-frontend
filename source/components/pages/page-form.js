import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import Form from 'components/form';

import actionCreators from 'action-creators';
import api from 'api';

const defaultProps = {
    schema: {
        data: {
            properties: {}
        }
    }
};

function mapStateToProps(state, props) {
    return ({
        schema: state.schemaByModel.get(props.location.query.model)
    });
}

const PageForm = React.createClass({
    propTypes: {
        location: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    componentWillMount() {
        api.schemas
            .find({ 'filter[model]': this.props.location.query.model })
            .then((resources) => {
                this.props.addResource(resources);
            });
    },

    handleChange() {

    },

    render() {
        return (
            <Form
                editable
                label="profile"
                record={{}}
                schema={this.props.schema.data}
                translation={this.props.translation}
                onChange={this.handleChange}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(PageForm);
