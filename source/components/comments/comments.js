import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import actionCreators from 'action-creators';

import { connect } from 'react-redux';

import { List } from 'material-ui/List';

import Divider from 'material-ui/Divider';

import CommentForm from './comment-form';
import CommentContainer from './comment-container';

function mapStateToProps(state, props) {
    return { comments: state.commentsByMessage.get(props.messageId) };
}

const Comments = React.createClass({
    propTypes: {
        messageId: PropTypes.string.isRequired,
        comments: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        parentId: PropTypes.string,
        load: PropTypes.bool
    },

    mixins: [PureRenderMixin],

    render() {
        const comments = this.props.comments.sort((comment1, comment2) => (comment1.created_at > comment2.created_at ? 1 : -1));

        let commentNodes = null;
        if (comments.size > 0) {
            commentNodes = (
                <List style={{ background: '#f5f5f5' }}>
                    {comments.valueSeq().map(comment => {
                        return (
                            <CommentContainer
                                key={comment.id}
                                comment={comment}
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
                    messageId={this.props.messageId}
                    formKey={this.props.messageId}
                />
            </aside>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Comments);
