import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import { connect } from 'react-redux';

import Link from 'components/link';

import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import { clearTokens } from 'action-creators';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import MessagesIcon from 'material-ui/svg-icons/communication/email';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import randomColor from 'utils/random-color';

const CurrentUserMenu = React.createClass({
    propTypes: {
        clearTokens: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    handleClearToken() {
        this.props.clearTokens();
    },

    render() {
        const linkStyle = {
            textDecoration: 'none'
        };

        return (
            <IconMenu
                useLayerForClickAway
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
                            backgroundColor={randomColor(this.context.currentUserPage.title)}
                        >
                            {this.context.currentUserPage.title[0]}
                        </Avatar>
                    </IconButton>
                }
            >
                <Link
                    to={`/profiles/${this.context.currentUserPage.slug}`}
                    style={linkStyle}
                >
                    <MenuItem
                        primaryText={this.context.translation.t('links.currentUserPage')}
                        rightIcon={<AccountIcon />}
                    />
                </Link>
                <Link to="/messages"
                    style={linkStyle}
                >
                    <MenuItem
                        primaryText={this.context.translation.t('links.messages')}
                        rightIcon={<MessagesIcon />}
                    />
                </Link>
                <Link to="/settings"
                    style={linkStyle}
                >
                    <MenuItem
                        primaryText={this.context.translation.t('links.settings')}
                        rightIcon={<SettingsIcon />}
                    />
                </Link>
                <Divider />
                <MenuItem
                    style={{ cursor: 'pointer' }}
                    onTouchTap={this.handleClearToken}
                    primaryText={this.context.translation.t(`actions.disconnect`)}
                />
            </IconMenu>
        );
    }
});

export default connect(undefined, { clearTokens })(CurrentUserMenu);
