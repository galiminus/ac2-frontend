import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './navigation.css';

import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import HomeIcon from 'material-ui/svg-icons/action/home';
import EventsIcon from 'material-ui/svg-icons/action/event';
import QuizzIcon from 'material-ui/svg-icons/toggle/check-box';
import PollsIcon from 'material-ui/svg-icons/social/poll';
import GroupsIcon from 'material-ui/svg-icons/social/group';
import MembersIcon from 'material-ui/svg-icons/action/language';
import MessagesIcon from 'material-ui/svg-icons/communication/email';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

const Navigation = React.createClass({
    propTypes: {
        currentUserPage: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        return (
            <nav styleName="root">
                <List>
                    <Link to="/">
                        <ListItem
                            primaryText={this.props.translation.t('links.mainFeed')}
                            leftIcon={<HomeIcon />}
                        />
                    </Link>
                    <Link to="/events">
                        <ListItem
                            primaryText={this.props.translation.t('links.events')}
                            leftIcon={<EventsIcon />}
                        />
                    </Link>
                    {false &&
                        <Link to="/quizz">
                            <ListItem
                                primaryText={this.props.translation.t('links.quizz')}
                                leftIcon={<QuizzIcon />}
                            />
                        </Link>
                    }
                    {false &&
                        <Link to="/polls">
                            <ListItem
                                primaryText={this.props.translation.t('links.polls')}
                                leftIcon={<PollsIcon />}
                            />
                        </Link>
                    }
                    {false &&
                        <Link to="/groups">
                            <ListItem
                                primaryText={this.props.translation.t('links.groups')}
                                leftIcon={<GroupsIcon />}
                            />
                        </Link>
                    }
                    <Link to="/members">
                        <ListItem
                            primaryText={this.props.translation.t('links.members')}
                            leftIcon={<MembersIcon />}
                        />
                    </Link>
                    <Divider />
                    {false &&
                        <Link to="/messages">
                            <ListItem
                                primaryText={this.props.translation.t('links.messages')}
                                leftIcon={<MessagesIcon />}
                            />
                        </Link>
                    }
                    {false &&
                        <Link to="/settings">
                            <ListItem
                                primaryText={this.props.translation.t('links.settings')}
                                leftIcon={<SettingsIcon />}
                            />
                        </Link>
                    }
                </List>
            </nav>
        );
    }
});

export default CSSModules(Navigation, styles);
