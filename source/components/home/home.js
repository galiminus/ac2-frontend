import React, { PropTypes } from 'react';

import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';

import Notifier from 'components/notifier';

import Chat from 'components/chat/chat-container';
import Navigation from 'components/navigation/navigation';
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
        maxWidth: 200
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
    mainContent: {
        ...smallScreenStyle.mainContent,
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
        toggleLeftNav: PropTypes.func.isRequired,
        leftNav: PropTypes.bool.isRequired,
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
            <div style={style.home}>
                <HeaderBar />

                <Drawer
                    docked={false}
                    open={this.props.leftNav}
                    onRequestChange={this.props.toggleLeftNav}
                >
                    <div>
                        <Navigation />
                        <AdditionalLinksContainer />
                    </div>
                </Drawer>

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
