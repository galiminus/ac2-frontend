import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';

import { updatePath } from 'redux-simple-router';
import { clearTokens } from 'action-creators';

import randomColor from 'utils/random-color';

function mapStateToProps(_state, _props) {
    return {};
}

const CurrentUserMenu = React.createClass({
    propTypes: {
        updatePath: PropTypes.func.isRequired,
        clearTokens: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    render() {
        const style = {
            marginTop: 8,
            marginLeft: 24,
            fontFamily: 'Roboto, sans-serif',
            textTransform: 'uppercase',
            cursor: 'pointer',
            backgroundColor: randomColor(this.context.currentUserPage.data.personal_informations.full_name)
        };

        return (
            <Avatar style={style}>{this.context.currentUserPage.data.personal_informations.full_name[0]}</Avatar>
        );
    }
});

export default connect(mapStateToProps, { updatePath, clearTokens })(CurrentUserMenu);
