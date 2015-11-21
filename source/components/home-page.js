import React from "react"
import { connect } from 'react-redux'

import {
  Toolbar,
  ToolbarGroup,
  LeftNav,
  MenuItem,
  FlatButton,
  Paper
} from "material-ui"

import { toolbarBackgroundColor } from "config"

import DisconnectedModal from "components/disconnected-modal"
import Navigation from "components/navigation"
import Feed from "components/feed"
import ToolbarLogo from "components/toolbar-logo"

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

let HomePage = function() {
  return (
    <div style={{height: "100%"}}>
      <Toolbar style={{backgroundColor: toolbarBackgroundColor, position: "fixed"}}>
        <ToolbarGroup key={0}>
          <ToolbarLogo />
        </ToolbarGroup>
      </Toolbar>
      <LeftNav ref="leftNav" docked={false}>
        <Navigation />
      </LeftNav>
      <div className="row" style={{minHeight: "100%"}}>
        <Paper className="col-md-2" style={{paddingRight: 0, marginTop: 56}}>
          <Navigation />
        </Paper>
        <Feed className="col-md" style={{paddingLeft: 0, paddingRight: 0, marginTop: 56}}/>
      </div>
      <DisconnectedModal />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
