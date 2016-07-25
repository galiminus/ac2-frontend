import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './home.css';

import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';

import Notifier from 'components/notifier';

import Chat from 'components/chat/chat-container';
import Navigation from 'components/navigation/navigation';
import HeaderBar from 'components/header-bar/header-bar';
import AdditionalLinksContainer from 'components/static/additional-links-container';

const Home = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired,
        leftNav: PropTypes.bool.isRequired,
        children: PropTypes.object.isRequired
    },

    render() {
        return (
            <div styleName="home">
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

                <div styleName="flexLayout">
                    <div styleName="leftNav">
                        <Navigation />
                        <AdditionalLinksContainer />
                    </div>
                    <div styleName="mainContent">
                        {this.props.children}
                    </div>
                    <Paper styleName="messagePanel">

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

export default CSSModules(Home, styles);
