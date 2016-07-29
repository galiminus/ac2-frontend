import React, { PropTypes } from 'react';

import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import Paper from 'material-ui/Paper';

import Notifier from 'components/notifier';

import Chat from 'components/chat/chat-container';
import Navigation from 'components/navigation/navigation';
import NavigationBar from 'components/navigation/navigation-bar';
import HeaderBar from 'components/header-bar/header-bar';
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
        top: 0
    },

    navigationBar: {
        display: 'none',
        width: '100%',
        position: 'fixed',
        zIndex: 3,
        top: 0
    },

    leftNav: {
        paddingRight: 0,
        zIndex: 2,
        position: 'fixed',
        width: 240,
        maxWidth: 240,
        height: '100%',
        marginTop: 56,
        display: 'flex',
        flexDirection: 'column'
    },

    mainContent: {
        marginTop: 56,
        width: 660,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 240,
        paddingRight: 300
    },

    messagePanel: {
        paddingRight: 0,
        marginTop: 56,
        width: 300,
        zIndex: 2,
        position: 'fixed',
        height: '100%',
        right: 0
    }
};

const smallScreenStyle = {
    ...style,
    leftNav: {
        ...style.leftNav,
        maxWidth: 200,
        display: 'block'
    },

    navigationBar: {
        ...style.navigationBar,
        display: 'none'
    },

    mainContent: {
        ...style.mainContent,
        maxWidth: 'none',
        width: 480,
        paddingLeft: 210
    }
};

const tabletScreenStyle = {
    ...smallScreenStyle,
    leftNav: {
        ...smallScreenStyle.leftNav,
        display: 'none'
    },

    navigationBar: {
        ...smallScreenStyle.navigationBar,
        display: 'block'
    },

    headerBar: {
        ...smallScreenStyle.headerBar,
        top: 56
    },

    mainContent: {
        ...smallScreenStyle.mainContent,
        marginTop: 112,
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: 0
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
        paddingRight: 0
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
            <div style={this.state.style.home}>
                <div style={this.state.style.navigationBar}>
                    <NavigationBar />
                </div>
                <div style={this.state.style.headerBar}>
                    <HeaderBar />
                </div>

                <div style={this.state.style.flexLayout}>
                    <div style={this.state.style.leftNav}>
                        <Navigation />
                        <AdditionalLinksContainer />
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
