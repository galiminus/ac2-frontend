import React from "react"
import { FlatButton, Dialog } from 'material-ui'
import { FormattedMessage } from 'react-intl'

export default function(props) {
  return (
    <Dialog
      actions={[
        <FlatButton
          key={"goToLoginPage"}
          label="LOL"
          primary={true}
          linkButton={true}
          href="#/welcome/login" />
      ]}
      open={props.isDisconnected}>
      <FormattedMessage id="errors.disconnected" />
    </Dialog>
  )
}
