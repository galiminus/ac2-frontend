import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    Avatar,
    IconMenu
} from "material-ui";

import MenuItem from "material-ui/lib/menus/menu-item";

import { updatePath } from "redux-simple-router";
import { clearTokens } from "action-creators";

import randomColor from "utils/random-color";

function mapStateToProps(_state, _props) {
    console.log(_state, _props);
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

    goToPage(e) {
        this.props.updatePath(`/${this.context.currentUserPage.id}`);
        e.preventDefault();
    },

    goToProfile(e) {
        this.props.updatePath(`/${this.context.currentUserPage.id}/profile`);
        e.preventDefault();
    },

    goToAccount(e) {
        this.props.updatePath("/account");
        e.preventDefault();
    },

    disconnect() {
        this.props.clearTokens();
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
                <MenuItem index={3} primaryText={this.context.translation.t("actions.disconnect")} onClick={this.disconnect} />
            </IconMenu>
        );
    }
});

export default connect(mapStateToProps, { updatePath, clearTokens })(CurrentUserMenu);
