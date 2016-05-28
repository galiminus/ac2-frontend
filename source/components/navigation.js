import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    List,
    ListItem
} from "material-ui";

import HomeIcon from "material-ui/svg-icons/action/home";
import AccountCircleIcon from "material-ui/svg-icons/action/account-circle";

import { updatePath } from "redux-simple-router";

const Navigation = React.createClass({
    propTypes: {
        updatePath: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    goToMainFeed(e) {
        this.props.updatePath("/");
        e.preventDefault();
    },

    goToPage(e) {
        this.props.updatePath(`/${this.context.currentUserPage.id}`);
        e.preventDefault();
    },

    render() {
        return (
            <List style={{ paddingLeft: 12 }}>
                <ListItem
                    index={0}
                    primaryText={this.context.translation.t("links.mainFeed")}
                    leftIcon={<HomeIcon />}
                    href="/"
                    onClick={this.goToMainFeed}
                />
                <ListItem
                    index={1}
                    primaryText={this.context.translation.t("links.currentUserPage")}
                    leftIcon={<AccountCircleIcon />}
                    href={`/${this.context.currentUserPage.id}`}
                    onClick={this.goToPage}
                />
            </List>
        );
    }
});

export default connect(undefined, { updatePath })(Navigation);
