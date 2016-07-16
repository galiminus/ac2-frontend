import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import actionCreators from 'action-creators';
import Settings from './settings';

function mapStateToProps(state) {
    return ({
        settings: state.settings
    });
}

const SettingsContainer = React.createClass({
    propTypes: {
        settings: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <Settings
                initialValues={{ settings: JSON.stringify(this.props.settings.data, null, 2) }}
                settings={this.props.settings}
                translation={this.props.translation}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(SettingsContainer);
