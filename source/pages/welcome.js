import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './welcome.css';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import ToolbarLogo from 'components/toolbar-logo';
import { Notifier } from 'components';

function mapStateToProps(state) {
    return {
        isLoggedIn: state.currentUser !== null,
        currentPath: state.routing.path
    };
}

const LoginPage = React.createClass({
    propTypes: {
        isLoggedIn: PropTypes.bool.isRequired,
        currentPath: PropTypes.string.isRequired,
        children: PropTypes.node
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    getFormTitle() {
        return {
            '/welcome/login': 'login',
            '/welcome/signup': 'signup',
            '/welcome/recover': 'recover'
        }[this.props.currentPath];
    },

    render() {
        return (
            <div styleName="root">
                <Toolbar styleName="headerBar">
                    <ToolbarGroup key={0} float="left">
                        <ToolbarLogo />
                    </ToolbarGroup>
                </Toolbar>
                <div styleName="illustration">

                </div>
                <div styleName="formContainer">
                    <div styleName="formPaper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapStateToProps)(CSSModules(LoginPage, styles));
