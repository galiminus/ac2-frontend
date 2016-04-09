import React, { PropTypes } from "react";
import { connect } from "react-redux";

import { Paper, ListItem } from "material-ui";

import actionCreators from "action-creators";
import { ActionCable } from "components";

function mapStateToProps(state, props) {
    return {
    };
}

const Messages = React.createClass({
    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    handleMessage() {

    },

    render() {
        return (
            <ActionCable channel="MessagesChannel" onMessage={this.handleMessage}>
                <div className="row" style={{ minHeight: "100%" }}>
                    <section className="col-md col-xs-12" style={{ paddingLeft: 0, paddingRight: 0, marginTop: 56 }}>
                        {this.props.children}
                    </section>
                </div>
            </ActionCable>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Messages);
