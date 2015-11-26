import React from "react"
import { connect } from 'react-redux'

import {
  Avatar
} from "material-ui"

function mapStateToProps(state, props) {
  return {
    user: state.users.get(props.userId)
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

let UserAvatar = function(props) {
  function getStyle() {
    return {
      fontFamily: "Roboto, sans-serif",
      fontWeight: 200,
      textTransform: "uppercase"
    }
  }

  return (
    <Avatar {...this.props} style={getStyle()}>{props.user.profile.name[0]}</Avatar>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAvatar)
