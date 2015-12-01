import React from "react"
import { connect } from 'react-redux'

import {
  Toolbar,
  ToolbarGroup,
  LeftNav,
  MenuItem,
  FlatButton,
  Paper,
  IconMenu,
  TextField,
  ToolbarSeparator
} from "material-ui"

import { toolbarBackgroundColor } from "config"

import DisconnectedModal from "components/disconnected-modal"
import Navigation from "components/navigation"
import Feed from "components/feed"
import ToolbarLogo from "components/toolbar-logo"
import UserAvatar from "components/user-avatar"

import { posts } from "api"
import store from "store"

function mapStateToProps(state) {
  return {
    currentUser: state.users.get(state.currentUser),
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

posts.find({}, store.dispatch)

let HomePage = function(props) {
  return (
    <div style={{height: "100%"}}>
      <Toolbar style={{backgroundColor: toolbarBackgroundColor, position: "fixed", zIndex: 1}}>
        <ToolbarGroup key={0}>
          <ToolbarLogo />
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          <TextField hintText="search" />
          <ToolbarSeparator />
          <UserAvatar user={props.currentUser} />
        </ToolbarGroup>
      </Toolbar>
      <LeftNav docked={false}>
        <Navigation />
      </LeftNav>
      <div className="row" style={{minHeight: "100%"}}>
        <Paper className="col-md-3" style={{paddingRight: 0, marginTop: 56}}>
          <Navigation />
        </Paper>
        <Feed posts={props.posts} className="col-md-9" style={{paddingLeft: 0, paddingRight: 0, marginTop: 56}} />
      </div>
      <DisconnectedModal isDisconnected={!props.currentUser} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
