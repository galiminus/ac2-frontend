import React, { PropTypes } from "react";

import FontIcon from 'material-ui/FontIcon';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import ToolbarLogo from "components/toolbar-logo";
import CurrentPageTitle from "components/current-page-title";
import CurrentUserMenu from "components/current-user-menu";

export default React.createClass({
    propTypes: {
        children: PropTypes.node
    },

    render() {
        return (
            <Toolbar style={{ position: "fixed", zIndex: 3, background: "#333", width: "100%" }}>
                <ToolbarGroup key={0} float="left">
                    <MenuIcon
                        style={{ paddingLeft: 0, paddingRight: 16, height: "auto" }}
                        color="#ffffff"
                        hoverColor="#ffffff"
                        onClick={this.props.toggleLeftNav}
                    />
                    <ToolbarLogo />
                    <ToolbarSeparator style={{ backgroundColor: "white" }}/>

                    <CurrentPageTitle />
                </ToolbarGroup>
                <ToolbarGroup key={2} float="right">
                    <CurrentUserMenu />
                </ToolbarGroup>
            </Toolbar>
        );
    }
});

// <InfoBanner page={this.props.page} main={this.props.params.pageId === undefined} />
