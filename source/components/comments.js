import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    List,
    FlatButton
} from "material-ui";

import { comments } from "api";

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

function mapDispatchToProps() {
    return {
    };
}

const Comments = React.createClass({
    propTypes: {
        postId: PropTypes.string.isRequired,
        comments: PropTypes.object.isRequired,
        parentId: PropTypes.string,
        load: PropTypes.bool
    },

    getInitialState() {
        return { page: 1, hasMore: false };
    },

    componentDidMount() {
        this.loadComments(this.props.postId, 1);
    },

    loadComments(postId, pageNum) {
        const query = { include: "sender" };

        query["page[number]"] = pageNum;
        query["page[size]"] = 25;
        query.sort = "updated_at";

        comments.find(postId, query).then((response) => {
            this.setState({ hasMore: !!(response.links && response.links.next) });
        });
    },

    loadMoreComments() {
        const nextPage = this.state.page + 1;

        this.setState({ page: nextPage });
        this.loadComments(this.props.postId, nextPage);
    },

    loadMoreButton() {
        if (this.state.hasMore) {
            return (<FlatButton label="Load more" style={{ width: "100%", padding: 8 }} onClick={this.loadMoreComments} />);
        }
        return (<div />);
    },

    render() {
        const commentNodes = this.props.comments.map(comment => <Comment key={comment.id} comment={comment} />);

        return (
            <ActionCable channel="CommentsChannel">
                <List style={{ padding: 24 }}>
                    {commentNodes}
                </List>
                <CommentForm postId={this.props.postId} formKey={this.props.postId} />
            </ActionCable>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);