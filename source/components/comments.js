import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    List,
    FlatButton
} from "material-ui";

import api from "api";

import actionCreators from "action-creators";

import CommentForm from "components/comment-form";
import Comment from "components/comment";
import ActionCable from "components/action-cable";

function mapStateToProps(state, props) {
    let commentProps;

    if (!props.postId) {
        commentProps = state.comments;
    } else {
        commentProps = state.comments.filter((comment) => {
            return (comment.post_id === props.postId && comment.parent_id === props.parentId);
        });
    }

    return {
        comments: commentProps.sort((comment1, comment2) => (comment1.updated_at > comment2.updated_at ? 1 : -1))
    };
}

const Comments = React.createClass({
    propTypes: {
        postId: PropTypes.string.isRequired,
        comments: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        parentId: PropTypes.string,
        load: PropTypes.bool
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    getInitialState() {
        return { page: 1, hasMore: false };
    },

    componentDidMount() {
        this.loadComments(this.props.postId, 1);
    },

    loadComments(postId, pageNum) {
        const query = { include: "sender,received_likes" };

        query["page[number]"] = pageNum;
        query["page[size]"] = 10;
        query.sort = "-updated_at";

        api.comments.find(postId, query).then((response) => {
            this.setState({ hasMore: !!(response.links && response.links.next) && response.data.length > 0 });
            this.props.addResource(response);
        });
    },

    loadMoreComments() {
        const nextPage = this.state.page + 1;

        this.setState({ page: nextPage });
        this.loadComments(this.props.postId, nextPage);
    },

    loadMoreButton() {
        if (this.state.hasMore) {
            return (
                <FlatButton
                    label={this.context.translation.t("actions.loadPreviousComments")}
                    style={{ width: "100%", fontSize: "0.8em" }}
                    onClick={this.loadMoreComments}
                />
            );
        }
        return (<div />);
    },

    handleMessage(comment) {
        if (comment) {
            this.props.addResource(comment);
        }
    },

    render() {
        let commentNodes = null;
        if (this.props.comments.count() > 0) {
            commentNodes = (
                <List style={{ padding: 18, paddingBottom: 18, paddingRight: 0 }}>
                    {this.props.comments.valueSeq().map(comment => <Comment key={comment.id} comment={comment} />)}
                </List>
            );
        }

        return (
            <ActionCable channel="CommentsChannel" onMessage={this.handleMessage}>
                {this.loadMoreButton()}
                {commentNodes}
                <CommentForm
                    style={{ padding: "0 26px" }}
                    postId={this.props.postId}
                    formKey={this.props.postId}
                />
            </ActionCable>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Comments);
