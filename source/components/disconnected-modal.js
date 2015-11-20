import React from "react"
import { connect } from "react-redux"
import { FlatButton, Dialog } from 'material-ui'
import { FormattedMessage } from 'react-intl'
import { Link } from "react-router"
import { updatePath } from 'redux-simple-router'

function mapStateToProps(state) {
  return { isDisconnected: state.currentUser === null }
}

function mapDispatchToProps(dispatch) {
  return {
    goToLoginPage: () => dispatch(updatePath('/login'))
  }
}

let DisconnectedModal = function(props) {
  return (
    <Dialog
      actions={[
        <FlatButton
          label={<FormattedMessage id="actions.goToLoginPage" />}
          linkButton={true}
          primary={true}
          onClick={props.goToLoginPage} />
      ]}
      open={props.isDisconnected}>
      <FormattedMessage id="errors.disconnected" />
    </Dialog>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisconnectedModal)
