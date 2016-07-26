import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './navigation.css';

import Link from 'components/link';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import HomeIcon from 'material-ui/svg-icons/action/home';
import EventsIcon from 'material-ui/svg-icons/action/event';
import QuizzIcon from 'material-ui/svg-icons/toggle/check-box';
import PollsIcon from 'material-ui/svg-icons/social/poll';
import GroupsIcon from 'material-ui/svg-icons/social/group';
import MembersIcon from 'material-ui/svg-icons/action/language';

const Navigation = React.createClass({
    mixins: [PureRenderMixin],

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
                </List>
            </nav>
        );
    }
});

export default CSSModules(Navigation, styles);
