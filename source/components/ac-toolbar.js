import React from "react"
import { Toolbar, ToolbarGroup } from "material-ui"
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Colors from 'material-ui/lib/styles/colors'
import ColorManipulator from 'material-ui/lib/utils/color-manipulator'
import Spacing from 'material-ui/lib/styles/spacing'

import ToolbarLogo from "components/toolbar-logo"

export default React.createClass({
  childContextTypes : {
    muiTheme: React.PropTypes.object,
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getMuiTheme({
        spacing: Spacing,
        fontFamily: 'Roboto, sans-serif',
        palette: {
          primary1Color: Colors.cyan500,
          primary2Color: Colors.cyan700,
          primary3Color: Colors.lightBlack,
          accent1Color: Colors.pinkA200,
          accent2Color: Colors.blueGrey800,
          accent3Color: Colors.grey500,
          textColor: Colors.white,
          alternateTextColor: Colors.white,
          canvasColor: Colors.blueGrey400,
          borderColor: Colors.grey300,
          disabledColor: Colors.lightWhite
        }
      })
    };
  },

  render() {
    return (
      <Toolbar style={{position: "fixed", zIndex: 1}}>
        <ToolbarGroup key={0}>
          <ToolbarLogo />
        </ToolbarGroup>
        {this.props.children}
      </Toolbar>
    )
  }
})
