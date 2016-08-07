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
        justifyContent: 'space-between'
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

const phoneScreenStyle = {
    ...style,
    
    flexLayout: {
        display: 'block'
    },

    messagePanel: {
        ...style.messagePanel,
        display: 'none'
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
        this.media({ minWidth: 800 }, () => this.setState({ style }));
        this.media({ maxWidth: 800 }, () => this.setState({ style: phoneScreenStyle }));
    },

    render() {
        return (
            <div style={{ ...this.state.style.home, backgroundColor: this.context.muiTheme.palette.backgroundColor }}>
                <div style={this.state.style.headerBar}>
                    <HeaderBar />
                </div>

                <div style={this.state.style.flexLayout}>
                    {this.props.children}
                    <Paper style={this.state.style.messagePanel}>

                    </Paper>
                </div>

                <Notifier />
            </div>
        );
    }
});

export default Home;
