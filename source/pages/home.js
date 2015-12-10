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
  ToolbarLogo,
  CurrentUserMenu,
  AcToolbar
} from "components"

import { leftNav } from "action-creators"

function mapStateToProps(state) {
  return {
    currentUser: state.users.get(state.currentUser),
    leftNav: state.leftNav
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleLeftNav: () => dispatch(leftNav.toggle())
  }
}

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
            <CurrentUserMenu user={this.props.currentUser} />
          </ToolbarGroup>
          <ToolbarGroup key={1} float="right">
            <AutoComplete hintText="search" className="hide-sm hide-xs" />
          </ToolbarGroup>
        </AcToolbar>
        <LeftNav docked={false} ref="leftNav">
          <Navigation />
        </LeftNav>
        <div className="row" style={{minHeight: "100%"}}>
          <Paper className="hide-sm hide-xs" style={{paddingRight: 0, marginTop: 56, width: 220, zIndex: 1}}>
            <Navigation style={{width: 220}} />
          </Paper>
          <section className="col-md col-xs-12" style={{paddingLeft: 0, paddingRight: 0, marginTop: 56, marginBottom: 32}}>
            {this.props.children}
          </section>
        </div>
        <DisconnectedModal isDisconnected={!this.props.currentUser} />
      </div>
    );
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
