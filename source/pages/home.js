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
  AutoComplete,
  Tabs,
  Tab,
  IconButton
} from "material-ui"

import { toolbarBackgroundColor } from "config"

import {
  DisconnectedModal,
  Navigation,
  Feed,
  ToolbarLogo,
  UserAvatar,
  AcToolbar
} from "components"

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
        <ToolbarGroup key={0} float="left">
          <IconButton className="material-icons">menu</IconButton>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right" className="hide-sm hide-xs">
          <AutoComplete hintText="search" />
          <UserAvatar user={props.currentUser} />
        </ToolbarGroup>
      </AcToolbar>
      <LeftNav docked={false}>
        <Navigation />
      </LeftNav>
      <div className="row" style={{minHeight: "100%"}}>
        <Paper className="col-md-2 hide-sm hide-xs" style={{paddingRight: 0, marginTop: 56}}>
          <Navigation />
        </Paper>
        <Feed posts={props.posts} className="col-md-7 col-xs-12" style={{paddingLeft: 0, paddingRight: 0, marginTop: 56}} />
      </div>
      <DisconnectedModal isDisconnected={!props.currentUser} />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
