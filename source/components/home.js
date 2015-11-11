import React from "react"
import { connect } from 'react-redux'

import { LeftNav, MenuItem, FlatButton } from "material-ui"

import LoginModal from "components/login-modal"

function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

function changeName() {
  return {
    type: "CHANGE_NAME",
    name: "Titi"
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeName: () => dispatch(changeName())
  }
}

let ActionButton = connect(mapStateToProps, mapDispatchToProps)(function(props) {
  return (
    <FlatButton onClick={props.changeName} label="LOL" style={{marginLeft: 400}} />
  )
})

export default React.createClass({
  render: function() {
    return (
      <div>
        <LeftNav ref="leftNav">
          <MenuItem index={1}>Inbox</MenuItem>
        </LeftNav>
        <ActionButton />
        <LoginModal />
      </div>
    );
  }
})
