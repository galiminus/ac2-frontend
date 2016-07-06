import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import CSSModules from 'react-css-modules';
import styles from './welcome.css';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import ToolbarLogo from 'components/toolbar-logo';
import Notifier from 'components/notifier';

function mapStateToProps(state) {
    return {
        translation: state.translations.get(state.currentLocale)
    };
}

const WelcomePage = React.createClass({
    propTypes: {
        children: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired
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
                        {React.cloneElement(this.props.children, { translation: this.props.translation })}
                    </div>
                </div>
                <Notifier />
            </div>
        );
    }
});

export default connect(mapStateToProps, CSSModules(WelcomePage, styles));
