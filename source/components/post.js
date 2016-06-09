import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Immutable from 'immutable';

import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ReportIcon from 'material-ui/svg-icons/content/report';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';

import api from 'api';
import actionCreators from 'action-creators';

import PageCardHeader from 'components/page-card-header';
import Comments from 'components/comments';
import Marked from 'components/marked';
import PostDialog from 'components/post-dialog';
import CreationDate from 'components/creation-date';
import PlusCounter from 'components/plus-counter';

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.post.sender_id),
        recipient: state.pages.get(props.post.recipient_id),
        likes: state.likesByPost.get(props.post.id)
    };
}

const Post = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        recipient: PropTypes.object,
        post: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        removeResource: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        likes: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            likes: Immutable.Map({}),
            currentUserPage: {}
        };
    },

    getInitialState() {
        return { postEditModalOpen: false };
    },

    handleOpenPostEditModal() {
        this.setState({ postEditModalOpen: true });
    },

    handleClosePostEditModal() {
        this.setState({ postEditModalOpen: false });
    },

    handlePostDestroy() {
        api.posts.destroy(this.props.post.id).then(() => {
            this.props.removeResource(this.props.post);
        });
    },

    myLike() {
        return (this.props.likes.find((like) => like.permissions.destroy));
    },

    handleLikeCreate() {
        api.likes.create({
            liked_id: this.props.post.id,
            liked_type: 'Post'
        }).then((response) => {
            this.props.addResource(response);
        });
    },

    handleLikeDestroy() {
        const myLike = this.myLike();

        api.likes.destroy(myLike.id).then(() => {
            this.props.removeResource(myLike);
        });
    },

    render() {
        const isLiked = !!this.myLike();

        return (
            <Card style={{ marginTop: 24, fontSize: '0.9em', lineHeight: '1.4em' }}>
                <PageCardHeader
                    sender={this.props.sender}
                    recipient={this.props.recipient}
                    additionalInfos={<PlusCounter likes={this.props.likes} />}
                    subtitle={
                        <CreationDate date={this.props.post.created_at} />
                    }
                >
                    <div style={{ float: 'right' }}>
                        <IconButton
                            onClick={isLiked ? this.handleLikeDestroy : this.handleLikeCreate}
                            iconStyle={{
                                width: 16,
                                height: 16,
                                background: (isLiked ? '#999' : '#cacaca'),
                                borderRadius: 24,
                                padding: 4
                            }}
                        >
                            <PlusOneIcon />
                        </IconButton>
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                            style={{ margin: -12 }}
                        >
                            {
                                (() => {
                                    if (this.props.post.permissions.update) {
                                        return (
                                            <MenuItem
                                                leftIcon={<EditIcon />}
                                                primaryText={this.context.translation.t('actions.edit')}
                                                onClick={this.handleOpenPostEditModal}
                                            />
                                        );
                                    }
                                })()
                            }

                            {
                                (() => {
                                    if (this.props.post.permissions.destroy) {
                                        return (
                                            <MenuItem
                                                leftIcon={<DeleteIcon />}
                                                primaryText={this.context.translation.t('actions.destroy')}
                                                onClick={this.handlePostDestroy}
                                            />
                                        );
                                    }
                                })()
                            }
                            <MenuItem
                                leftIcon={<ReportIcon />}
                                primaryText={this.context.translation.t('actions.report')}
                                onClick={this.handlePostReport}
                            />

                        </IconMenu>
                    </div>
                    <PostDialog
                        contentStyle={{ width: 500 }}
                        modal={false}
                        open={this.state.postEditModalOpen}
                        onRequestClose={this.handleClosePostEditModal}
                        sender={this.props.currentUserPage}
                        recipient={this.props.recipient}
                        initialValues={this.props.post.data}
                        id={this.props.post.id}
                        formKey={this.props.post.id}
                    />
                </PageCardHeader>
                <Divider inset />
                <CardText>
                    <Marked body={this.props.post.data.body} />
                </CardText>
                <Comments
                    postId={this.props.post.id}
                    parentId={null}
                    currentUserPage={this.props.currentUserPage}
                />
            </Card>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Post);
