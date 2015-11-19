import React from "react"
import { connect } from 'react-redux'

import {
  LeftNav,
  MenuItem,
  FlatButton,
  Paper
} from "material-ui"

import DisconnectedModal from "components/disconnected-modal"
import Navigation from "components/navigation"
import Feed from "components/feed"

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

let HomePage = function() {
  return (
    <div>
      <LeftNav ref="leftNav" docked={false}>
        <Navigation />
      </LeftNav>
      <div className="row">
        <Paper className="col-md-3" style={{paddingRight: 0}}>
          <Navigation />
        </Paper>
        <Feed className="col-md" style={{paddingLeft: 0, paddingRight: 0}}/>
      </div>
      <DisconnectedModal />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
