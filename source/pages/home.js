import React from "react"
import { connect } from 'react-redux'

import {
  ToolbarGroup,
  LeftNav,
  MenuItem,
  FlatButton,
  Paper,
  IconMenu,
  FontIcon,
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

import { leftNav } from "action-creators"

import { posts } from "api"
import store from "store"

function mapStateToProps(state) {
  return {
    currentUser: state.users.get(state.currentUser),
    posts: state.posts,
    leftNav: state.leftNav
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLeftNav: () => dispatch(leftNav.toggle())
  }
}

posts.find({}, store.dispatch)

let HomePage = React.createClass({
  componentWillReceiveProps(props) {
    if (this.props.leftNav != props.leftNav) {
      this.refs.leftNav.toggle()
    }
  },

  render() {
    return (
      <div style={{height: "100%"}}>
        <AcToolbar>
          <ToolbarGroup key={0} float="left">
            <FontIcon className="material-icons hide-md hide-lg" style={{paddingLeft: 0, paddingRight: 24}} onClick={this.props.toggleLeftNav}>menu</FontIcon>
            <ToolbarLogo />
          </ToolbarGroup>
          <ToolbarGroup key={2} float="right">
            <UserAvatar user={this.props.currentUser} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <AutoComplete hintText="search" className="hide-sm hide-xs" />
          </ToolbarGroup>
        </AcToolbar>
        <LeftNav docked={false} ref="leftNav">
          <Navigation />
        </LeftNav>
        <div className="row" style={{minHeight: "100%"}}>
          <Paper className="col-md-2 hide-sm hide-xs" style={{paddingRight: 0, marginTop: 56}}>
            <Navigation />
          </Paper>
          <Feed posts={this.props.posts} className="col-md-7 col-xs-12" style={{paddingLeft: 0, paddingRight: 0, marginTop: 56}} />
        </div>
        <DisconnectedModal isDisconnected={!this.props.currentUser} />
      </div>
    );
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
