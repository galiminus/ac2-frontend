import React, { PropTypes } from "react";
import { connect } from "react-redux";

import { Card, CardText } from "material-ui/Card";
import Divider from "material-ui/Divider";
import PageCardHeader from "components/page-card-header";
import Comments from "components/comments";
import Marked from "components/marked";

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.post.sender_id),
        recipient: state.pages.get(props.post.recipient_id)
    };
}

const Post = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        recipient: PropTypes.object,
        post: PropTypes.object.isRequired
    },

    render() {
        return (
            <Card style={{ marginTop: 24, fontSize: "0.9em", lineHeight: "1.4em" }}>
                <PageCardHeader sender={this.props.sender} recipient={this.props.recipient} />
                <Divider inset />
                <CardText>
                    <Marked body={this.props.post.data.body} />
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
