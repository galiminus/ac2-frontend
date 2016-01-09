import React, { PropTypes } from "react";

import {
    Avatar,
    IconMenu
} from "material-ui";

import MenuItem from "material-ui/lib/menus/menu-item";

import { updatePath } from "redux-simple-router";

import randomColor from "utils/random-color";

import { dispatch } from "store";
import actions from "action-creators";

const CurrentUserMenu = React.createClass({
    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    goToPage(e) {
        dispatch(updatePath(`/${this.context.currentUserPage.id}`));
        e.preventDefault();
    },

    goToProfile(e) {
        dispatch(updatePath(`/${this.context.currentUserPage.id}/profile`));
        e.preventDefault();
    },

    goToAccount(e) {
        dispatch(updatePath("/account"));
        e.preventDefault();
    },

    disconnect() {
        dispatch(actions.tokens.clear());
    },

    render() {
        const style = {
            marginTop: 8,
            marginLeft: 24,
            fontFamily: "Roboto, sans-serif",
            textTransform: "uppercase",
            cursor: "pointer",
            backgroundColor: randomColor(this.context.currentUserPage.data.personal_informations.full_name)
        };

        return (
            <IconMenu iconButtonElement={<Avatar style={style}>{this.context.currentUserPage.data.personal_informations.full_name[0]}</Avatar>}>
                <MenuItem index={1} primaryText={this.context.translation.t("links.currentUserPage")} href={`/${this.context.currentUserPage.id}`} onClick={this.goToPage} />
                <MenuItem index={1} primaryText={this.context.translation.t("links.currentUserProfile")} href={`/${this.context.currentUserPage.id}/profile`} onClick={this.goToProfile} />
                <MenuItem index={4} primaryText={this.context.translation.t("actions.disconnect")} onClick={this.disconnect} />
            </IconMenu>
        );
    }
});

export default CurrentUserMenu;
