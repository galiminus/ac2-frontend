import React, { PropTypes } from 'react';

import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import Paper from 'material-ui/Paper';

import Notifier from 'components/notifier';

import Chat from 'components/chat/chat-container';
import HeaderBar from 'components/header-bar';
import SettingsMenu from 'components/settings-menu';
import AdditionalLinksContainer from 'components/static/additional-links-container';

const style = {
    home: {
        minHeight: '100%'
    },

    flexLayout: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },

    mainLayout: {
        minHeight: '100%'
    },

    headerBar: {
        width: '100%',
        position: 'fixed',
        zIndex: 3,
        top: -1
    },

    leftNav: {
        paddingRight: 0,
        zIndex: 2,
        position: 'fixed',
        width: 240,
        maxWidth: 240,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },

    mainContent: {
        marginTop: 68,
        width: 660,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingRight: 310,
        paddingLeft: 240,
        overflow: 'hidden'
    },

    messagePanel: {
        paddingRight: 0,
        marginTop: 55,
        width: 300,
        zIndex: 2,
        position: 'fixed',
        height: '100%',
        right: 0,
        borderRadius: 0
    }
};

const smallScreenStyle = {
    ...style,
    leftNav: {
        ...style.leftNav,
        maxWidth: 200
    },

    mainContent: {
        ...style.mainContent,
        maxWidth: 'none',
        width: '90%',
        paddingLeft: 210
    }
};

const tabletScreenStyle = {
    ...smallScreenStyle,

    leftNav: {
        ...smallScreenStyle.leftNav,
        display: 'none'
    },

    mainContent: {
        ...smallScreenStyle.mainContent,
        marginTop: 55,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 10
    }
};

const phoneScreenStyle = {
    ...tabletScreenStyle,
    messagePanel: {
        ...tabletScreenStyle.messagePanel,
        display: 'none'
    },
    mainContent: {
        ...tabletScreenStyle.mainContent,
        paddingRight: 0,
        paddingLeft: 0,
        width: '100%'
    }
};

const Home = React.createClass({
    propTypes: {
        children: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin, ResponsiveMixin],

    getInitialState() {
        return ({ style });
    },

    componentDidMount() {
        this.media({ minWidth: 1230 }, () => this.setState({ style }));
        this.media({ maxWidth: 1230 }, () => this.setState({ style: smallScreenStyle }));
        this.media({ maxWidth: 1010 }, () => this.setState({ style: tabletScreenStyle }));
        this.media({ maxWidth: 800 }, () => this.setState({ style: phoneScreenStyle }));
    },

    render() {
        return (
            <div style={{ ...this.state.style.home, backgroundColor: this.context.muiTheme.palette.backgroundColor }}>
                <div style={this.state.style.headerBar}>
                    <HeaderBar />
                </div>

                <div style={this.state.style.flexLayout}>
                    <div style={this.state.style.leftNav}>
                        <div />
                        <div>
                            <AdditionalLinksContainer />

                            {this.context.settings.permissions.update &&
                                <SettingsMenu />
                            }
                        </div>
                    </div>
                    <div style={this.state.style.mainContent}>
                        {this.props.children}
                    </div>
                    <Paper style={this.state.style.messagePanel}>

                    </Paper>
                </div>

                <Notifier />
            </div>
        );
    }
});

// <Chat
//     currentUserPage={this.props.currentUserPage}
//     translation={this.props.translation}
// />

export default Home;
