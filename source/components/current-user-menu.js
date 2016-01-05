import React, { PropTypes } from "react";

import {
    Avatar,
    IconMenu
} from "material-ui";

import MenuItem from "material-ui/lib/menus/menu-item";

import { updatePath } from "redux-simple-router";

import randomColor from "utils/random-color";

import { FormattedMessage } from "react-intl";

import { dispatch } from "store";
import { tokens } from "action-creators";

const CurrentUserMenu = React.createClass({
    propTypes: {
        currentUserPage: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return ({
            page: {
                data: {
                    personal_informations: {
                        full_name: ""
                    }
                }
            }
        });
    },

    goToPage(e) {
        dispatch(updatePath(`/${this.props.currentUserPage.id}`));
        e.preventDefault();
    },

    goToProfile(e) {
        dispatch(updatePath(`/${this.props.currentUserPage.id}/profile`));
        e.preventDefault();
    },

    goToAccount(e) {
        dispatch(updatePath("/account"));
        e.preventDefault();
    },

    disconnect() {
        dispatch(tokens.clear());
    },

    render() {
        const style = {
            marginTop: 8,
            marginLeft: 24,
            fontFamily: "Roboto, sans-serif",
            textTransform: "uppercase",
            cursor: "pointer",
            backgroundColor: randomColor(this.props.currentUserPage.data.personal_informations.full_name)
        };

        return (
            <IconMenu iconButtonElement={<Avatar style={style}>{this.props.currentUserPage.data.personal_informations.full_name[0]}</Avatar>}>
                <MenuItem index={1} primaryText={<FormattedMessage id="links.currentUserPage" />} href={`/${this.props.currentUserPage.id}`} onClick={this.goToPage} />
                <MenuItem index={1} primaryText={<FormattedMessage id="links.currentUserProfile" />} href={`/${this.props.currentUserPage.id}/profile`} onClick={this.goToProfile} />
                {/* <MenuItem index={2} primaryText={<FormattedMessage id="links.accountSettings" />} href="/account" onClick={this.goToAccount} /> */}
                <MenuItem index={4} primaryText={<FormattedMessage id="actions.disconnect" />} onClick={this.disconnect} />
            </IconMenu>
        );
    }
});

export default CurrentUserMenu;
