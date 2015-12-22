import React from "react";

import { ToolbarTitle } from "material-ui";
import { title } from "config";

export default React.createClass({
    getStyle() {
        return {
            fontFamily: "Roboto, sans-serif",
            fontWeight: 100,
            letterSpacing: 3
        };
    },

    render() {
        return (
            <ToolbarTitle {...this.props} text={title} style={this.getStyle()} />
        );
    }
});
