import React from "react"

import { ToolbarTitle } from "material-ui"
import { title, toolbarTitleColor } from "config"

export default React.createClass({
  getStyle() {
    return {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 100,
      letterSpacing: 3,
      color: toolbarTitleColor
    }
  },

  render() {
    return(
      <ToolbarTitle {...this.props} text={title} style={this.getStyle()} />
    )
  }
})
