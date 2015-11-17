import React from "react";
import { connect } from "react-redux"
import { FlatButton, Dialog } from 'material-ui'
import { FormattedMessage } from 'react-intl';
import { Link } from "react-router"

function mapStateToProps(state) {
  return { isDisconnected: !state.token.data.access_token }
}

let DisconnectedModal = function(props) {
  return (
    <Dialog
      actions={[
        <FlatButton
          label={<FormattedMessage id="actions.goToLoginPage" />}
          linkButton={true}
          primary={true}
          containerElement={<Link to="/login" />} />
      ]}
      open={props.isDisconnected}>
      <FormattedMessage id="errors.disconnected" />
    </Dialog>
  )
}

export default connect(mapStateToProps)(DisconnectedModal)
