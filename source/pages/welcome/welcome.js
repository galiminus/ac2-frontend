import React, { PropTypes } from 'react';

import CSSModules from 'react-css-modules';
import styles from './welcome.css';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import ToolbarLogo from 'components/toolbar-logo';

const WelcomePage = React.createClass({
    propTypes: {
        children: PropTypes.object.isRequired
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

export default CSSModules(WelcomePage, styles);
