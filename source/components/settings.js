import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import actionCreators from 'action-creators';
import Form from 'components/form';

import api from 'api';

function mapStateToProps(state) {
    return ({
        settings: state.settings
    });
}

const Settings = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        settings: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        setTitle: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    componentWillMount() {
        this.props.setTitle(this.props.translation.t('links.settings'));
    },

    onChange(data) {
        return (
            api.settings.update(this.props.settings.id, { data })
                .then(
                    (response) => {
                        this.props.addResource(response);
                    })
        );
    },

    render() {
        return (
            <Form
                label="settings"
                record={this.props.settings.data}
                schema={this.props.settings.schema}
                editable={this.props.settings.permissions.update}
                translation={this.props.translation}
                onChange={this.onChange}
                only={[this.props.params.category]}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Settings);
