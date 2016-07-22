import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';

import { clearTokens } from 'action-creators';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';

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
                <Link
                    to={`/${this.props.currentUserPage.slug}/profile`}
                    style={{ textDecoration: 'none' }}
                >
                    <MenuItem
                        primaryText={this.props.translation.t('links.currentUserPage')}
                        rightIcon={<AccountIcon />}
                    />
                </Link>
                <Divider />
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
