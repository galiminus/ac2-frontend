import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    List,
    ListItem
} from "material-ui";

import { updatePath } from "redux-simple-router";

const Navigation = React.createClass({
    propTypes: {
        updatePath: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    goToMainFeed(e) {
        this.props.updatePath("/");
        e.preventDefault();
    },

    goToMessages(e) {
        this.props.updatePath("/messages");
        e.preventDefault();
    },

    render() {
        return (
            <List {...this.props}>
                <ListItem index={0} primaryText={this.context.translation.t("links.messages")} href="/messages" onClick={this.goToMessages} />
                <ListItem index={1} primaryText={this.context.translation.t("links.mainFeed")} href="/" onClick={this.goToMainFeed} />
            </List>
        );
    }
});

export default connect(undefined, { updatePath })(Navigation);
