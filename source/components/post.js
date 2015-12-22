import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    Paper,
    Toolbar,
    ToolbarGroup,
    ToolbarTitle
} from "material-ui";

import UserAvatar from "components/user-avatar";

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.post.sender_id)
    };
}

const Post = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired
    },

    render() {
        let senderInfos;
        if (this.props.sender) {
            switch (this.props.sender.type) {
            case "user_pages":
                senderInfos = (
                    <div>
                        <UserAvatar page={this.props.sender} />
                        <ToolbarTitle text={this.props.sender.data.full_name} />
                    </div>
                );
                break;

            default:
                senderInfos = <div />;
                break;
            }
        }

        return (
            <Paper style={{ marginTop: 24 }}>
                <Toolbar>
                    <ToolbarGroup key={1} float="left">
                        {senderInfos}
                    </ToolbarGroup>
                </Toolbar>
                <div style={{ padding: 24 }}>
                    {this.props.post.data.body}
                </div>
            </Paper>
        );
    }
});

export default connect(mapStateToProps)(Post);
