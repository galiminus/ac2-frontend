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
import UserLink from "components/user-link";
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
                      title={<UserLink page={this.props.sender} />}
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
                <Comments
                    postId={this.props.post.id}
                    parentId={null}
                />
            </Card>
        );
    }
});

export default connect(mapStateToProps)(Post);
