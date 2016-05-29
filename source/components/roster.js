import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    List,
    ListItem
} from "material-ui";

import { updatePath } from "redux-simple-router";

function mapStateToProps(_state, _props) {
    return {
    };
}

const Roster = React.createClass({
    propTypes: {
        updatePath: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    goToChat(e) {
        this.props.updatePath("/messages");
        e.preventDefault();
    },

    render() {
        return (
            <List>
                <ListItem index={0} primaryText={this.context.translation.t("links.messages")} href="/messages" onClick={this.goToChat} />
            </List>
        );
    }
});

export default connect(mapStateToProps, { updatePath })(Roster);
