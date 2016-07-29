import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import Link from 'components/link';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import HomeIcon from 'material-ui/svg-icons/action/home';
import EventsIcon from 'material-ui/svg-icons/action/event';
import QuizzIcon from 'material-ui/svg-icons/toggle/check-box';
import PollsIcon from 'material-ui/svg-icons/social/poll';
import GroupsIcon from 'material-ui/svg-icons/social/group';
import MembersIcon from 'material-ui/svg-icons/action/language';

const style = {
    root: {
        backgroundColor: '#333',
        padding: 4
    },

    nav: {
        width: '100%',
        textAlign: 'center'
    },

    button: {
        padding: 0,
        width: 30,
        height: 30
    },

    icon: {
        width: 24,
        height: 24,
        color: '#fff'
    },

    label: {
        fontSize: 10,
        color: '#fff'
    }
};

const NavigationBar = React.createClass({
    mixins: [PureRenderMixin, ResponsiveMixin],

    getInitialState() {
        return ({ style });
    },

    render() {
        return (
            <Toolbar style={this.state.style.root}>
                <ToolbarGroup key={1} style={this.state.style.nav}>
                    <Link to="/">
                        <IconButton
                            style={this.state.style.button}
                        >
                            <HomeIcon color={this.state.style.icon.color} style={this.state.style.icon} />
                        </IconButton>
                        <div style={this.state.style.label}>
                            {this.context.translation.t('links.mainFeed')}
                        </div>
                    </Link>
                    <Link to="/events">
                        <IconButton
                            style={this.state.style.button}
                        >
                            <EventsIcon color={this.state.style.icon.color} style={this.state.style.icon} />
                        </IconButton>
                        <div style={this.state.style.label}>
                            {this.context.translation.t('links.events')}
                        </div>
                    </Link>


                    <Link to="/quizz">
                        <IconButton
                            style={this.state.style.button}
                        >
                            <QuizzIcon color={this.state.style.icon.color} style={this.state.style.icon} />
                        </IconButton>
                        <div style={this.state.style.label}>
                            {this.context.translation.t('links.quizz')}
                        </div>
                    </Link>

                    <Link to="/polls">
                        <IconButton
                            style={this.state.style.button}
                        >
                            <PollsIcon color={this.state.style.icon.color} style={this.state.style.icon} />
                        </IconButton>
                        <div style={this.state.style.label}>
                            {this.context.translation.t('links.polls')}
                        </div>
                    </Link>

                    <Link to="/groups">
                        <IconButton
                            style={this.state.style.button}
                        >
                            <GroupsIcon color={this.state.style.icon.color} style={this.state.style.icon} />
                        </IconButton>
                        <div style={this.state.style.label}>
                            {this.context.translation.t('links.groups')}
                        </div>
                    </Link>

                    <Link to="/profiles">
                        <IconButton
                            style={this.state.style.button}
                        >
                           <MembersIcon color={this.state.style.icon.color} style={this.state.style.icon} />
                        </IconButton>
                        <div style={this.state.style.label}>
                            {this.context.translation.t('links.profiles')}
                        </div>
                    </Link>
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

export default NavigationBar;
