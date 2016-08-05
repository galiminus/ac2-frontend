import React from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import AutoComplete from 'material-ui/AutoComplete';
import HomeIcon from 'material-ui/svg-icons/action/home';
import EventsIcon from 'material-ui/svg-icons/action/event';
import GroupsIcon from 'material-ui/svg-icons/social/group';
import MembersIcon from 'material-ui/svg-icons/action/language';

import ToolbarLogo from 'components/toolbar-logo';
import CurrentUserMenu from 'components/current-user-menu';

import Link from 'components/link';

const style = {
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    },

    left: {
        flex: 2,
        justifyContent: 'flex-start'
    },

    right: {},

    searchField: {
        width: 460,
        margin: '5px 0 5px 16px',
        background: 'rgba(0, 0, 0, 0.1)',
        padding: '0 12px'
    },

    button: {
        margin: '8px 4px 0 4px',
        height: 40,
        width: 40,
        padding: 0
    },

    icon: {
        color: 'rgba(255, 255, 255, 1)',
        width: 24,
        height: 24
    }
};

const tabletScreenStyle = {
    ...style,
    root: {
        ...style.root,
        padding: '0 10px'
    },

    logo: {
        ...style.logo,
        display: 'none'
    },

    searchField: {
        ...style.searchField,
        width: '100%',
        marginLeft: 0
    }
};

const phoneScreenStyle = {
    ...tabletScreenStyle,
    root: {
        borderBottom: 'none'
    },

    title: {
        ...tabletScreenStyle.title,
        display: 'none'
    },

    left: {
        ...tabletScreenStyle.left,
        display: 'none'
    },

    right: {
        ...tabletScreenStyle.right,
        width: '100%'
    }
};

const HeaderBar = React.createClass({
    mixins: [PureRenderMixin, ResponsiveMixin],

    getInitialState() {
        return ({ style });
    },

    componentDidMount() {
        this.media({ minWidth: 1010 }, () => this.setState({ style }));
        this.media({ maxWidth: 1010 }, () => this.setState({ style: tabletScreenStyle }));
        this.media({ maxWidth: 800 }, () => this.setState({ style: phoneScreenStyle }));
    },

    render() {
        return (
            <Toolbar style={{ ...this.state.style.root, backgroundColor: this.context.muiTheme.palette.backgroundColor }}>
                <ToolbarGroup style={this.state.style.left}>
                    <div style={this.state.style.logo}>
                        <ToolbarLogo />
                    </div>

                    <div style={this.state.style.searchField}>
                        <AutoComplete
                            hintText={this.context.translation.t('labels.search')}
                            dataSource={[]}
                            fullWidth
                            hintStyle={{ color: 'rgba(255, 255, 255, 0.8)' }}
                            underlineStyle={{ width: '100%' }}
                            inputStyle={{ color: '#fff' }}
                        />
                    </div>
                </ToolbarGroup>
                <ToolbarGroup style={this.state.style.right}>
                    <Link to="/">
                        <IconButton style={this.state.style.button} iconStyle={this.state.style.icon}>
                            <HomeIcon />
                        </IconButton>
                    </Link>

                    <Link to="/events">
                        <IconButton style={this.state.style.button} iconStyle={this.state.style.icon}>
                            <EventsIcon />
                        </IconButton>
                    </Link>

                    <Link to="/groups">
                        <IconButton style={this.state.style.button} iconStyle={this.state.style.icon}>
                            <GroupsIcon />
                        </IconButton>
                    </Link>

                    <Link to="/profiles">
                        <IconButton style={this.state.style.button} iconStyle={this.state.style.icon}>
                           <MembersIcon />
                        </IconButton>
                    </Link>
                    <CurrentUserMenu />
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

export default HeaderBar;
