import React from "react"
import { connect } from "react-redux"

import {
  Avatar,
} from "material-ui"

function mapStateToProps(state, props) {
    let page;
    if (props.user) {
        page = state.pages.get(props.user.page_id)
    }

    if (!page) {
        page = { data: { name: "" } }
    }

    return ({ page })
}

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
      <Avatar style={style}>{this.props.page.data.name[0]}</Avatar>
    )
  }
})

export default connect(mapStateToProps)(UserAvatar)
