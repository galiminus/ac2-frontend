import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import {
    List,
    FlatButton
} from 'material-ui';

import Divider from 'material-ui/Divider';

import api from 'api';

import actionCreators from 'action-creators';

import CommentForm from 'components/comment-form';
import Comment from 'components/comment';
import connectToCable from 'components/action-cable';

function mapStateToProps(state, props) {
    return { comments: state.commentsByPost.get(props.postId) };
}

const Comments = React.createClass({
    mixins: [PureRenderMixin],

    propTypes: {
        postId: PropTypes.string.isRequired,
        comments: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object.isRequired,
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
    //    this.loadComments(this.props.postId, 1);
    },

    getChannels() {
        return (['CommentsChannel']);
    },

    loadComments(postId, pageNum) {
        const query = { include: 'sender,received_likes' };

        query['page[number]'] = pageNum;
        query['page[size]'] = 10;
        query.sort = '-updated_at';

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
                    label={this.context.translation.t('actions.loadPreviousComments')}
                    style={{ width: '100%', fontSize: '0.8em' }}
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
                {this.loadMoreButton()}
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
