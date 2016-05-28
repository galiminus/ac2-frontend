import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    Card,
    CardHeader,
    CardText,
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
        post: PropTypes.object.isRequired
    },

    render() {
        let senderInfos;
        if (this.props.sender) {
            switch (this.props.sender.data_type) {
            case "user":
                senderInfos = (
                    <CardHeader
                      title={this.props.sender.data.personal_informations.full_name}
                      avatar={<UserAvatar page={this.props.sender} />}
                    />
                );
                break;

            default:
                senderInfos = null;
                break;
            }
        }

        return (
            <Card style={{ marginTop: 24, fontSize: "0.9em", lineHeight: "1.4em" }}>
                {senderInfos}
                <CardText>
                    {this.props.post.data.body}
                </CardText>
                <Divider />
                <div style={{ padding: "0.5em 8px 0.5em 8px" }}>
                    <Comments
                        postId={this.props.post.id}
                        parentId={null}
                    />
                </div>
            </Card>
        );
    }
});

export default connect(mapStateToProps)(Post);
