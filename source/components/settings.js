import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import actionCreators from 'action-creators';
import Form from 'components/form';

import api from 'api';

function mapStateToProps(state) {
    return ({
        settings: state.settings,
        schema: state.schemas.get(state.settings.schema_id)
    });
}

const Settings = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        settings: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        setTitle: PropTypes.func.isRequired,
        schema: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return ({ loading: false });
    },

    componentWillMount() {
        this.props.setTitle(this.context.translation.t('links.settings'));
    },

    handleChange(data) {
        this.setState({ loading: true });
        return (
            api.settings.update(this.props.settings.id, { data })
                .then(
                    (response) => {
                        this.setState({ loading: false });
                        this.props.addResource(response);
                    })
        );
    },

    render() {
        return (
            <Form
                label="settings"
                record={this.props.settings.data}
                schema={this.props.schema.data}
                editable={this.props.settings.permissions.update}
                loading={this.state.loading}
                onChange={this.handleChange}
                only={[this.props.params.category]}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Settings);
