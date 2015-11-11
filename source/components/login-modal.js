import React from "react";
import { connect } from "react-redux"
import { TextField, FlatButton, Dialog, Snackbar } from 'material-ui';

function mapStateToProps(state) {
  return { isLoggedIn: !!state.currentUser }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

let LoginModal = function(props) {
  return (
    <Dialog open={!props.isLoggedIn}>
      <form onSubmit={this.authenticate} style={{textAlign: "right"}}>
        <div className="column" style={{textAlign: 'center', paddingBottom: 16}}>
          <div>
            <img src={"lol"} />
          </div>
          <div>
            <TextField type="email" floatingLabelText="Email" onChange={this.onChangeEmail} />
          </div>
          <div>
            <TextField type="password" floatingLabelText="Password" onChange={this.onChangePassword} />
          </div>
        </div>
        <FlatButton
          label="Forgot your password?"
          secondary={false}
        />
        <FlatButton
          label="Login"
          secondary={true}
          onTouchTap={this.authenticate}
        />
        </form>
    </Dialog>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
