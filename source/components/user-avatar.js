import React from "react"

import {
  Avatar,
} from "material-ui"

const UserAvatar = React.createClass({
  render() {
    const style = {
      marginTop: 8,
      marginLeft: -16,
      marginRight: 8,
      fontFamily: "Roboto, sans-serif",
      textTransform: "uppercase",
      cursor: "pointer"
    }
    return (
      <Avatar style={style}>{this.props.page.data.full_name[0]}</Avatar>
    )
  }
})

export default UserAvatar
