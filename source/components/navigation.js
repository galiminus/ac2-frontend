import React from "react"
import {
  List,
  ListItem,
  ListDivider,
} from "material-ui"

import MenuItem from 'material-ui/lib/menus/menu-item'

import { dispatch } from "store"
import { updatePath } from 'redux-simple-router'

import { FormattedMessage } from "react-intl"

const Navigation = React.createClass({
  goToMainFeed(e) {
    dispatch(updatePath("/"))
    e.preventDefault()
  },

  render() {
    return (
      <List {...this.props}>
        <ListItem index={0} primaryText={<FormattedMessage id="links.mainFeed" />} href="/" onClick={this.goToMainFeed} />
      </List>
    )
  }
})

export default Navigation
