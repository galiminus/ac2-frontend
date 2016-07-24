import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';
import Immutable from 'immutable';

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

    getInitialState() {
        return ({
            record: Immutable.fromJS({})
        });
    },

    componentWillMount() {
        api.schemas
            .find({ 'filter[model]': this.props.location.query.model })
            .then((resources) => {
                this.props.addResource(resources);
            });
    },

    handleChange(data) {
        this.setState({ record: this.state.record.mergeDeep(data) });
    },

    render() {
        return (
            <Form
                loading={false}
                editable
                label="profile"
                schema={this.props.schema.data}
                translation={this.props.translation}
                onChange={this.handleChange}
                record={this.state.record.toJS()}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(PageForm);
