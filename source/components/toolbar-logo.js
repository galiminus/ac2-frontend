import React from "react";

import { ToolbarTitle } from "material-ui";
import { title } from "config";

const style = {
    fontFamily: "Roboto, sans-serif",
    fontWeight: 400,
    letterSpacing: 3,
    color: 'rgb(204, 150, 116)',
    paddingRight: 0
};

export default React.createClass({
    render() {
        return (
            <ToolbarTitle text={title} style={style} {...this.props} />
        );
    }
});
