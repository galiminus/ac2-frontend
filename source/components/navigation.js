import React, { PropTypes } from 'react';

import CSSModules from 'react-css-modules';
import styles from './navigation.css';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import HomeIcon from 'material-ui/svg-icons/action/home';
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import EventsIcon from 'material-ui/svg-icons/action/event';
import QuizzIcon from 'material-ui/svg-icons/toggle/check-box';
import PollsIcon from 'material-ui/svg-icons/social/poll';
import GroupsIcon from 'material-ui/svg-icons/social/group';
import MembersIcon from 'material-ui/svg-icons/action/language';
import FriendsIcon from 'material-ui/svg-icons/action/favorite';
import MessagesIcon from 'material-ui/svg-icons/communication/email';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import { Link } from 'react-router';

const Navigation = React.createClass({
    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    render() {
        return (
            <nav styleName="root">
                <List>
                    <Link to="/">
                        <ListItem
                            primaryText={this.context.translation.t('links.mainFeed')}
                            leftIcon={<HomeIcon />}
                        />
                    </Link>
                    <Link to="/events">
                        <ListItem
                            primaryText={this.context.translation.t('links.events')}
                            leftIcon={<EventsIcon />}
                        />
                    </Link>
                    <Link to="/quizz">
                        <ListItem
                            primaryText={this.context.translation.t('links.quizz')}
                            leftIcon={<QuizzIcon />}
                        />
                    </Link>
                    <Link to="/polls">
                        <ListItem
                            primaryText={this.context.translation.t('links.polls')}
                            leftIcon={<PollsIcon />}
                        />
                    </Link>
                    <Link to="/groups">
                        <ListItem
                            primaryText={this.context.translation.t('links.groups')}
                            leftIcon={<GroupsIcon />}
                        />
                    </Link>
                    <Link to="/members">
                        <ListItem
                            primaryText={this.context.translation.t('links.members')}
                            leftIcon={<MembersIcon />}
                        />
                    </Link>
                    <Divider />
                    <Link to={`/${this.context.currentUserPage.id}/profile`}>
                        <ListItem
                            primaryText={this.context.translation.t('links.currentUserPage')}
                            leftIcon={<AccountIcon />}
                        />
                    </Link>
                    <Link to={`/${this.context.currentUserPage.id}/friends`}>
                        <ListItem
                            primaryText={this.context.translation.t('links.friends')}
                            leftIcon={<FriendsIcon />}
                        />
                    </Link>
                    <Link to="/messages">
                        <ListItem
                            primaryText={this.context.translation.t('links.messages')}
                            leftIcon={<MessagesIcon />}
                        />
                    </Link>
                    <Link to="/settings">
                        <ListItem
                            primaryText={this.context.translation.t('links.settings')}
                            leftIcon={<SettingsIcon />}
                        />
                    </Link>
                </List>
            </nav>
        );
    }
});

export default CSSModules(Navigation, styles);
