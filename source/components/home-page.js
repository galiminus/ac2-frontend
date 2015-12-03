import React from "react"
import { connect } from 'react-redux'

import {
  ToolbarGroup,
  LeftNav,
  MenuItem,
  FlatButton,
  Paper,
  IconMenu,
  TextField,
  ToolbarSeparator,
  AutoComplete
} from "material-ui"

import { toolbarBackgroundColor } from "config"

import DisconnectedModal from "components/disconnected-modal"
import Navigation from "components/navigation"
import Feed from "components/feed"
import ToolbarLogo from "components/toolbar-logo"
import UserAvatar from "components/user-avatar"
import AcToolbar from "components/ac-toolbar"

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
      <AcToolbar>
        <ToolbarGroup key={1} float="right">
          <AutoComplete hintText="search" />
          <UserAvatar user={props.currentUser} />
        </ToolbarGroup>
      </AcToolbar>
      <LeftNav docked={false}>
        <Navigation />
      </LeftNav>
      <div className="row" style={{minHeight: "100%"}}>
        <Paper className="col-md-3 col-xs-12" style={{paddingRight: 0, marginTop: 56}}>
          <Navigation />
        </Paper>
        <Feed posts={props.posts} className="col-md-9 col-xs-12" style={{paddingLeft: 0, paddingRight: 0, marginTop: 56}} />
      </div>
      <DisconnectedModal isDisconnected={!props.currentUser} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
