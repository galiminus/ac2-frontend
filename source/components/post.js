import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';

import api from 'api';
import actionCreators from 'action-creators';

import PageCardHeader from 'components/page-card-header';
import Comments from 'components/comments';
import Marked from 'components/marked';
import PostDialog from 'components/post-dialog';
import CreationDate from 'components/creation-date';

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
        post: PropTypes.object.isRequired,
        removeResource: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
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
            this.props.removeResource(this.props.post.id);
        });
    },

    render() {
        return (
            <Card style={{ marginTop: 24, fontSize: '0.9em', lineHeight: '1.4em' }}>
                <PageCardHeader
                    sender={this.props.sender}
                    recipient={this.props.recipient}
                    subtitle={<CreationDate date={this.props.post.created_at} />}
                >
                    <IconMenu
                        iconButtonElement={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>}
                        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        style={{ float: 'right', margin: -10 }}
                    >
                        {
                            () => {
                                if (this.props.post.permissions.update) {
                                    return (
                                        <MenuItem
                                            leftIcon={<EditIcon />}
                                            primaryText={this.context.translation.t('actions.edit')}
                                            onClick={this.handleOpenPostEditModal}
                                        />
                                    );
                                }
                            }()
                        }

                        {
                            () => {
                                if (this.props.post.permissions.destroy) {
                                    return (
                                        <MenuItem
                                            leftIcon={<DeleteIcon />}
                                            primaryText={this.context.translation.t('actions.destroy')}
                                            onClick={this.handlePostDestroy}
                                        />
                                    );
                                }
                            }()
                        }

                    </IconMenu>
                    <PostDialog
                        contentStyle={{ width: 500 }}
                        modal={false}
                        open={this.state.postEditModalOpen}
                        onRequestClose={this.handleClosePostEditModal}
                        sender={this.props.currentUserPage}
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
