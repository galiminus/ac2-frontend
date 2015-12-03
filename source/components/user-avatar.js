import React from "react"

import {
  Avatar,
  IconMenu,
  MenuItem,
  IconButton,
  DropDownIcon
} from "material-ui"

export default function(props) {
  function getStyle() {
    return {
    }
  }

  const avatarButton =
    <IconButton>
      <Avatar {...props} style={getStyle()}>{props.user.profile.name[0]}</Avatar>
    </IconButton>

    let iconMenuItems = [
      { payload: '1', text: 'Download' },
      { payload: '2', text: 'More Info' }
    ];

  return (
    <DropDownIcon iconClassName="icon-navigation-expand-more" menuItems={iconMenuItems} />

  )
}
