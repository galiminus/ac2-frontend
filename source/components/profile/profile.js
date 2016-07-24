import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import api from 'api';

import actionCreators from 'action-creators';
import Form from 'components/form';

const Profile = React.createClass({
    propTypes: {
        resource: PropTypes.object.isRequired,
        schema: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return ({ loading: false });
    },

    componentWillMount() {
        this.props.setTitle(this.props.resource.title);
    },

    onChange(data) {
        this.setState({ loading: true });
        return (
            api.pages
                .update(this.props.resource.id, { data })
                .then((resource) => {
                    this.setState({ loading: false });
                    this.props.addResource(resource);
                })
        );
    },

    render() {
        return (
            <Form
                loading={this.state.loading}
                label="profile"
                record={this.props.resource.data}
                schema={this.props.schema.data}
                editable={this.props.resource.permissions.update}
                translation={this.props.translation}
                onChange={this.onChange}
            />
        );
    }
});

export default connect(undefined, actionCreators)(Profile);
