import React, { PropTypes } from "react";
import { connect } from "react-redux";

import CSSModules from 'react-css-modules';
import styles from './header-bar.css';

import FontIcon from 'material-ui/FontIcon';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import ToolbarLogo from "components/toolbar-logo";
import CurrentPageTitle from "components/current-page-title";
import CurrentUserMenu from "components/current-user-menu";

import { toggleLeftNav } from "action-creators";

const HeaderBar = React.createClass({
    propTypes: {
        toggleLeftNav: PropTypes.func.isRequired
    },

    render() {
        return (
            <Toolbar styleName="root">
                <ToolbarGroup key={0} float="left">
                    <div styleName="leftNavTrigger">
                        <MenuIcon
                            styleName="leftNavTrigger"
                            style={{ height: 56 }}
                            color="#ffffff"
                            hoverColor="#ffffff"
                            onClick={this.props.toggleLeftNav}
                        />
                    </div>
                    <ToolbarLogo styleName="logo" />
                    <ToolbarSeparator styleName="separator" />

                    <CurrentPageTitle />
                </ToolbarGroup>
                <ToolbarGroup key={2} float="right">
                    <CurrentUserMenu />
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

export default connect(undefined, { toggleLeftNav })(CSSModules(HeaderBar, styles));
