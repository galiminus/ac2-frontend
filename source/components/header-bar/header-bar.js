import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import { connect } from 'react-redux';

import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AutoComplete from 'material-ui/AutoComplete';
import ToolbarLogo from 'components/toolbar-logo';
import CurrentPageTitle from 'components/current-page-title';
import CurrentUserMenu from 'components/current-user-menu';

import SettingsMenu from './settings-menu';

import actionCreators from 'action-creators';

const style = {
    root: {
        position: 'fixed',
        zIndex: 3,
        backgroundColor: '#333333',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'end'
    },

    left: {
        flex: 2,
        justifyContent: 'flex-start'
    },

    leftNavTrigger: {
        paddingLeft: 0,
        paddingRight: 8,
        height: 56
    },

    separator: {
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginRight: 16,
        marginLeft: 16
    },

    searchField: {
        width: 460,
        margin: '5px 0 5px 16px',
        background: '#444',
        padding: '0 12px'
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
    },

    separator: {
        ...style.separator,
        display: 'none'
    }
};

const phoneScreenStyle = {
    ...tabletScreenStyle,
    title: {
        ...tabletScreenStyle.title,
        display: 'none'
    }
};

const HeaderBar = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired
    },

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
            <Toolbar style={this.state.style.root}>
                <ToolbarGroup key={0} style={this.state.style.left}>
                    <div style={this.state.style.leftNavTrigger}>
                        <MenuIcon
                            style={this.state.style.leftNavTrigger}
                            color="#ffffff"
                            hoverColor="#ffffff"
                            onClick={this.props.toggleLeftNav}
                        />
                    </div>
                    <div style={this.state.style.logo}>
                        <ToolbarLogo />
                    </div>
                    <ToolbarSeparator style={this.state.style.separator} />

                    <div style={this.state.style.title}>
                        <CurrentPageTitle />
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
                <ToolbarGroup key={2}>
                    {this.context.settings.permissions.update &&
                        <SettingsMenu />
                    }
                    <CurrentUserMenu />
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

export default connect(undefined, actionCreators)(HeaderBar);
