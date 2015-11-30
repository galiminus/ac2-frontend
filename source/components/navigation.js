import React from "react"
import {
  List,
  ListItem,
  ListDivider
} from "material-ui"

export default function(props) {
  return (
    <List {...props}>
      <ListItem key={"inbox"} primaryText="Inbox" />
    </List>
  )
}
