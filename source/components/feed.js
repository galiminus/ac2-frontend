import React from "react"
import { connect } from 'react-redux'

import {
} from "material-ui"

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

let Feed = function(props) {
  return (
    <div {...props}>
      <img style={{width: "100%"}} src="https://placeholdit.imgix.net/~text?txtsize=33&txt=placeholder&w=1000&h=300" />
      <div className="container-fluid">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
