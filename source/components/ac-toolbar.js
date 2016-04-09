import React, { PropTypes } from "react";
import { Toolbar } from "material-ui";

export default React.createClass({
    propTypes: {
        children: PropTypes.node
    },

    render() {
        return (
            <Toolbar style={{ position: "fixed", zIndex: 3 }}>
                {this.props.children}
            </Toolbar>
        );
    }
});
