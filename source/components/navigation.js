import React from "react"
import { connect } from 'react-redux'
import {
  List,
  ListItem,
  ListDivider
} from "material-ui"

let Navigation = function(props) {
  return (
    <List>
      <ListItem key={"inbox"} primaryText="Inbox" />
    </List>
  )
}

export default connect()(Navigation)
