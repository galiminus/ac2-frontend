import React from "react"

import {
  Avatar,
  IconMenu
} from "material-ui"

import MenuItem from "material-ui/lib/menus/menu-item"

import { FormattedMessage } from 'react-intl'

export default function(props) {
  const style = {
    marginTop: 8,
    marginLeft: 24,
    fontFamily: "Roboto, sans-serif",
    textTransform: "uppercase",
    cursor: "pointer"
  }
  return (
    <IconMenu iconButtonElement={<Avatar {...props} style={style}>{props.user.profile.name[0]}</Avatar>}>
      <MenuItem index={1} primaryText={<FormattedMessage id="links.currentUserProfile" />} />
      <MenuItem index={2} primaryText={<FormattedMessage id="links.accountSettings" />} />
      <MenuItem index={3} primaryText={<FormattedMessage id="links.privacySettings" />} />
      <MenuItem index={4} primaryText={<FormattedMessage id="actions.disconnect" />} />
    </IconMenu>
  )
}
