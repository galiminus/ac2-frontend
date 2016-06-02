import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import List from 'material-ui/List';

import { updatePath } from 'redux-simple-router';

function mapStateToProps(_state, _props) {
    return {
    };
}

const Roster = React.createClass({
    propTypes: {
        updatePath: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    goToChat(e) {
        this.props.updatePath('/messages');
        e.preventDefault();
    },

    render() {
        return (
            <List>
            </List>
        );
    }
});

export default connect(mapStateToProps, { updatePath })(Roster);
