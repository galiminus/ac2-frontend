import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';

import { updatePath } from 'redux-simple-router';
import { clearTokens } from 'action-creators';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import randomColor from 'utils/random-color';

const CurrentUserMenu = React.createClass({
    propTypes: {
        updatePath: PropTypes.func.isRequired,
        clearTokens: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    handleClearToken() {
        this.props.clearTokens();
    },

    render() {
        const style = {
            marginTop: 8,
            marginLeft: 24,
            fontFamily: 'Roboto, sans-serif',
            textTransform: 'uppercase',
            cursor: 'pointer',
            backgroundColor: randomColor(this.props.currentUserPage.title)
        };

        return (
            <IconMenu
                iconButtonElement={
                    <Avatar style={style}>{this.props.currentUserPage.title[0]}</Avatar>
                }
            >
                <MenuItem
                    style={{ cursor: 'pointer' }}
                    onTouchTap={this.handleClearToken}
                    primaryText={this.props.translation.t(`actions.disconnect`)}
                />
            </IconMenu>
        );
    }
});

export default connect(undefined, { updatePath, clearTokens })(CurrentUserMenu);
