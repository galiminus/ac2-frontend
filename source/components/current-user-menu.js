import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import Avatar from 'material-ui/Avatar';

import { clearTokens } from 'action-creators';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import randomColor from 'utils/random-color';

const CurrentUserMenu = React.createClass({
    propTypes: {
        clearTokens: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    handleClearToken() {
        this.props.clearTokens();
    },

    render() {
        return (
            <IconMenu
                iconButtonElement={
                    <IconButton
                        style={{
                            marginTop: 6,
                            marginLeft: 10
                        }}
                        iconStyle={{
                            marginTop: -10,
                            marginLeft: -10,
                            textTransform: 'uppercase'
                        }}
                    >
                        <Avatar
                            backgroundColor={randomColor(this.props.currentUserPage.title)}
                        >
                            {this.props.currentUserPage.title[0]}
                        </Avatar>
                    </IconButton>
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

export default connect(undefined, { clearTokens })(CurrentUserMenu);
