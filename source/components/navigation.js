import React, { PropTypes } from "react";
import {
    List,
    ListItem
} from "material-ui";

import { dispatch } from "store";
import { updatePath } from "redux-simple-router";

const Navigation = React.createClass({
    propTypes: {
        translations: PropTypes.object.isRequired
    },

    goToMainFeed(e) {
        dispatch(updatePath("/"));
        e.preventDefault();
    },

    render() {
        return (
            <List {...this.props}>
                <ListItem index={0} primaryText={this.props.translations.t("links.mainFeed")} href="/" onClick={this.goToMainFeed} />
            </List>
        );
    }
});

export default Navigation;
