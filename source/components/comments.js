import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import { List } from 'material-ui/List';

import Divider from 'material-ui/Divider';

import actionCreators from 'action-creators';

import CommentForm from 'components/comment-form';
import Comment from 'components/comment';
import connectToCable from 'components/action-cable';

function mapStateToProps(state, props) {
    return { comments: state.commentsByPost.get(props.postId) };
}

const Comments = React.createClass({
    propTypes: {
        postId: PropTypes.string.isRequired,
        comments: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object,
        parentId: PropTypes.string,
        load: PropTypes.bool
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getChannels() {
        return (['CommentsChannel']);
    },

    handleMessage(comment) {
        if (comment) {
            this.props.addResource(comment);
        }
    },

    render() {
        const comments = this.props.comments.sort((comment1, comment2) => (comment1.created_at > comment2.created_at ? 1 : -1));

        let commentNodes = null;
        if (comments.size > 0) {
            commentNodes = (
                <List style={{ background: '#f5f5f5' }}>
                    {comments.valueSeq().map(comment => {
                        return (
                            <Comment
                                key={comment.id}
                                comment={comment}
                                currentUserPage={this.props.currentUserPage}
                            />
                        );
                    })}
                </List>
            );
        }

        return (
            <aside>
                {commentNodes}
                <Divider />
                <CommentForm
                    style={{ padding: '0 26px' }}
                    postId={this.props.postId}
                    formKey={this.props.postId}
                    currentUserPage={this.props.currentUserPage}
                />
            </aside>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(connectToCable(Comments));
