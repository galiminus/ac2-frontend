import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './home.css';

import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';

import DisconnectedModal from 'components/disconnected-modal';
import Navigation from 'components/navigation';
import HeaderBar from 'components/header-bar';
import Notifier from 'components/notifier';
import Roster from 'components/roster';
import AdditionalLinks from 'components/additional-links';

const Home = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired,
        leftNav: PropTypes.bool.isRequired,
        isDisconnected: PropTypes.bool.isRequired,
        children: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object
    },

    render() {
        return (
            <div styleName="home">
                <HeaderBar currentUserPage={this.props.currentUserPage} />

                <Drawer docked={false} open={this.props.leftNav} onRequestChange={this.props.toggleLeftNav}>
                    <Navigation currentUserPage={this.props.currentUserPage} />
                </Drawer>

                <div styleName="flexLayout">
                    <div styleName="leftNav">
                        <Navigation currentUserPage={this.props.currentUserPage} />
                        <AdditionalLinks />
                    </div>
                    <main styleName="mainContent">
                        {this.props.children}
                    </main>
                    <Paper styleName="messagePanel">
                        <Roster />
                    </Paper>
                </div>

                <Notifier />

                <DisconnectedModal isDisconnected={this.props.isDisconnected} />
            </div>
        );
    }
});

export default CSSModules(Home, styles);
