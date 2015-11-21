import React from "react"
import { connect } from 'react-redux'
import {
  List,
  ListItem,
  ListDivider
} from "material-ui"

let Navigation = function(props) {
  return (
    <List {...props}>
      <ListItem key={"inbox"} primaryText="Inbox" />
    </List>
  )
}

export default connect()(Navigation)
