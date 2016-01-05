import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    Paper,
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    Divider
} from "material-ui";

import UserAvatar from "components/user-avatar";
import Comments from "components/comments";

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.post.sender_id)
    };
}

const Post = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired
    },

    render() {
        let senderInfos;
        if (this.props.sender) {
            switch (this.props.sender.data_type) {
            case "user":
                senderInfos = (
                    <div>
                        <UserAvatar page={this.props.sender} />
                        <ToolbarTitle text={this.props.sender.data.personal_informations.full_name} />
                    </div>
                );
                break;

            default:
                senderInfos = null;
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
                <div style={{ padding: "1em" }}>
                    {this.props.post.data.body}
                </div>
                <div style={{ padding: "0.5em 1em" }}>
                    <Comments postId={this.props.post.id} parentId={null} currentUserPage={this.props.currentUserPage} />
                </div>
            </Paper>
        );
    }
});

export default connect(mapStateToProps)(Post);
