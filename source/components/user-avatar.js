import React from "react"

import {
  Avatar
} from "material-ui"

export default function(props) {
  function getStyle() {
    return {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 200,
      textTransform: "uppercase"
    }
  }

  return (
    <Avatar {...props} style={getStyle()}>{props.user.profile.name[0]}</Avatar>
  )
}
