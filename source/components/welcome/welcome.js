import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'components/pure-render-mixin';
import ResponsiveMixin from 'react-responsive-mixin';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import ToolbarLogo from 'components/toolbar-logo';
import Notifier from 'components/notifier';

const style = {
    root: {
        height: '100%',
        overflow: 'hidden'
    },

    body: {
        display: 'flex',
        height: '100%',
        paddingTop: 56
    },

    illustration: {
        flex: 2,
        height: '100%',
        background: 'transparent no-repeat center center fixed',
        backgroundSize: 'cover'
    },

    formContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

    formPaper: {
        padding: 32
    },

    headerBar: {
        backgroundColor: '#333333',
        width: '100%',
        position: 'fixed',
        top: 0,
        zIndex: 1
    }
};

const tabletScreenStyle = {
    ...style,
    root: {
        ...style.root,
        overflow: 'visible'
    },

    illustration: {
        ...style.illustration,
        display: 'none'
    },

    body: {
        ...style.body,
        height: 'auto'
    },

    formContainer: {
        ...style.formContainer,
        width: '100%',
        height: 'auto',
        display: 'block'
    }
};

function mapStateToProps(state) {
    return ({
        translation: state.translations.get(state.currentLocale),
        welcomePageIllustrations: state.settings.data.welcomePageIllustrations
    });
}

const defaultProps = {
    welcomePageIllustrations: []
};

const WelcomePage = React.createClass({
    propTypes: {
        children: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired,
        welcomePageIllustrations: PropTypes.array.isRequired
    },

    childContextTypes: {
        translation: React.PropTypes.object
    },

    mixins: [PureRenderMixin, ResponsiveMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return ({ style });
    },

    getChildContext() {
        return ({
            translation: this.props.translation
        });
    },

    componentDidMount() {
        this.media({ minWidth: 800 }, () => this.setState({ style }));
        this.media({ maxWidth: 800 }, () => this.setState({ style: tabletScreenStyle }));
    },

    render() {
        return (
            <div style={this.state.style.root}>
                <Toolbar style={this.state.style.headerBar}>
                    <ToolbarGroup key={0}>
                        <ToolbarLogo />
                    </ToolbarGroup>
                </Toolbar>
                <div style={this.state.style.body}>
                    <div
                        style={{
                            ...this.state.style.illustration,
                            backgroundImage: `url(${this.props.welcomePageIllustrations[0]})`
                        }}
                    />
                    <div style={this.state.style.formContainer}>
                        <div style={this.state.style.formPaper}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <Notifier />
            </div>
        );
    }
});

export default connect(mapStateToProps)(WelcomePage);
