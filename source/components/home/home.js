import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './home.css';

import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';

import DisconnectedModal from 'components/disconnected-modal';
import Notifier from 'components/notifier';

import Chat from 'components/chat/chat-container';
import Navigation from 'components/navigation/navigation';
import HeaderBar from 'components/header-bar/header-bar';
import AdditionalLinks from 'components/additional-links/additional-links';

const Home = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired,
        leftNav: PropTypes.bool.isRequired,
        isDisconnected: PropTypes.bool.isRequired,
        children: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    render() {
        return (
            <div styleName="home">
                <HeaderBar
                    currentUserPage={this.props.currentUserPage}
                    translation={this.props.translation}
                />

                <Drawer
                    docked={false}
                    open={this.props.leftNav}
                    onRequestChange={this.props.toggleLeftNav}
                >
                    <Navigation
                        currentUserPage={this.props.currentUserPage}
                        translation={this.props.translation}
                    />
                </Drawer>

                <div styleName="flexLayout">
                    <div styleName="leftNav">
                        <Navigation
                            currentUserPage={this.props.currentUserPage}
                            translation={this.props.translation}
                        />
                        <AdditionalLinks
                            translation={this.props.translation}
                        />
                    </div>
                    <div styleName="mainContent">
                        {React.cloneElement(this.props.children, { translation: this.props.translation })}
                    </div>
                    <Paper styleName="messagePanel">
                        <Chat
                            currentUserPage={this.props.currentUserPage}
                            translation={this.props.translation}
                        />
                    </Paper>
                </div>

                <Notifier translation={this.props.translation} />

                <DisconnectedModal
                    isDisconnected={this.props.isDisconnected}
                    translation={this.props.translation}
                />
            </div>
        );
    }
});

export default CSSModules(Home, styles);
