import React, { PropTypes } from "react";
import { connect } from "react-redux";

import CSSModules from "react-css-modules";
import styles from "./navigation.css";

import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";

import HomeIcon from "material-ui/svg-icons/action/home";
import AccountCircleIcon from "material-ui/svg-icons/action/account-circle";
import EventIcon from "material-ui/svg-icons/action/event";
import QuizzIcon from "material-ui/svg-icons/toggle/check-box";
import PollIcon from "material-ui/svg-icons/social/poll";
import GroupIcon from "material-ui/svg-icons/social/group";
import FriendIcon from "material-ui/svg-icons/action/favorite";
import MessageIcon from "material-ui/svg-icons/communication/email";
import SettingsIcon from "material-ui/svg-icons/action/settings";

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
            <nav styleName="root">
                <List>
                    <ListItem
                        index={0}
                        primaryText={this.context.translation.t("links.mainFeed")}
                        leftIcon={<HomeIcon />}
                        href="/"
                        onClick={this.goToMainFeed}
                    />
                    <ListItem
                        index={0}
                        primaryText={this.context.translation.t("links.events")}
                        leftIcon={<EventIcon />}
                        href="/events"
                        onClick={this.goToMainFeed}
                    />
                    <ListItem
                        index={0}
                        primaryText={this.context.translation.t("links.quizz")}
                        leftIcon={<QuizzIcon />}
                        href="/quizz"
                        onClick={this.goToQuizz}
                    />
                    <ListItem
                        index={0}
                        primaryText={this.context.translation.t("links.polls")}
                        leftIcon={<PollIcon />}
                        href="/polls"
                        onClick={this.goToMainPolls}
                    />
                    <ListItem
                        index={0}
                        primaryText={this.context.translation.t("links.groups")}
                        leftIcon={<GroupIcon />}
                        href="/groups"
                        onClick={this.goToMainGroups}
                    />
                    <Divider />
                    <ListItem
                        index={1}
                        primaryText={this.context.translation.t("links.currentUserPage")}
                        leftIcon={<AccountCircleIcon />}
                        href={`/${this.context.currentUserPage.id}`}
                        onClick={this.goToPage}
                    />
                    <ListItem
                        index={1}
                        primaryText={this.context.translation.t("links.friends")}
                        leftIcon={<FriendIcon />}
                        href={`/${this.context.currentUserPage.id}/friends`}
                        onClick={this.goToPage}
                    />
                    <ListItem
                        index={1}
                        primaryText={this.context.translation.t("links.messages")}
                        leftIcon={<MessageIcon />}
                        href={`/${this.context.currentUserPage.id}/messages`}
                        onClick={this.goToPage}
                    />
                    <ListItem
                        index={1}
                        primaryText={this.context.translation.t("links.settings")}
                        leftIcon={<SettingsIcon />}
                        href={`/${this.context.currentUserPage.id}/settings`}
                        onClick={this.goToPage}
                    />
                </List>
            </nav>
        );
    }
});

export default connect(undefined, { updatePath })(CSSModules(Navigation, styles));
