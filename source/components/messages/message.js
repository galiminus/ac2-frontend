import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

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
import LinkIcon from 'material-ui/svg-icons/editor/insert-link';
import ReportIcon from 'material-ui/svg-icons/content/report';

import api from 'api';
import actionCreators from 'action-creators';

import PageCardHeader from 'components/pages/page-card-header';
import Comments from 'components/comments/comments';
import Marked from 'components/marked/marked';
import CreationDate from 'components/creation-date';
import PlusCounter from 'components/plus-counter';
import PlusButton from 'components/plus-button';
import Link from 'components/link';

import MessageDialog from './message-dialog';

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.resource.sender_id),
        recipient: state.pages.get(props.resource.recipient_id),
        likes: state.likesByMessage.get(props.resource.id)
    };
}

const defaultProps = {
    likes: Immutable.Map({})
};

const Message = React.createClass({
    propTypes: {
        sender: PropTypes.object,
        recipient: PropTypes.object,
        resource: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        removeResource: PropTypes.func.isRequired,
        likes: PropTypes.object.isRequired,
        pushNotification: PropTypes.func.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return {
            messageEditDialogOpen: false,
        };
    },

    handleOpenMessageEditDialog() {
        this.setState({ messageEditDialogOpen: true });
    },

    handleCloseMessageEditDialog() {
        this.setState({ messageEditDialogOpen: false });
    },

    handleMessageDestroy() {
        api.messages.destroy(this.props.resource.id).then(
            () => {
                this.props.removeResource(this.props.resource);
            },
            () => {
                this.props.pushNotification('message_destroy_fatal_error');
            });
    },

    myLike() {
        return (this.props.likes.find((like) => like.permissions.destroy));
    },

    handleLikeCreate() {
        api.likes.create({
            liked_id: this.props.resource.id,
            liked_type: 'Message'
        }).then(
            (response) => {
                this.props.addResource(response);
            },
            () => {
                this.props.pushNotification('like_create_fatal_error');
            }
        );
    },

    handleLikeDestroy() {
        const myLike = this.myLike();

        api.likes.destroy(myLike.id).then(
            () => {
                this.props.removeResource(myLike);
            },
            () => {
                this.props.pushNotification('like_destroy_fatal_error');
            }
        );
    },

    render() {
        if (!this.props.sender) {
            return (<div />);
        }
        const isLiked = !!this.myLike();

        return (
            <Card style={{ marginTop: 24, fontSize: '0.9em', lineHeight: '1.4em' }}>
                <PageCardHeader
                    sender={this.props.sender}
                    recipient={this.props.recipient}
                    additionalInfos={<PlusCounter likes={this.props.likes} />}
                    subtitle={
                        <CreationDate
                            style={{ marginLeft: 0, textAlign: 'left' }}
                            date={this.props.resource.created_at}
                        />
                    }
                >
                    <div style={{ float: 'right' }}>
                        <PlusButton
                            onLike={this.handleLikeCreate}
                            onUnlike={this.handleLikeDestroy}
                            isSelected={isLiked}
                        />
                        <IconMenu
                            useLayerForClickAway
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
                                this.props.resource.permissions.update &&
                                    <MenuItem
                                        leftIcon={<EditIcon />}
                                        style={{ cursor: 'pointer' }}
                                        primaryText={this.context.translation.t('actions.edit')}
                                        onTouchTap={this.handleOpenMessageEditDialog}
                                    />
                            }

                            {
                                this.props.resource.permissions.destroy &&
                                    <MenuItem
                                        leftIcon={<DeleteIcon />}
                                        style={{ cursor: 'pointer' }}
                                        primaryText={this.context.translation.t('actions.destroy')}
                                        onTouchTap={this.handleMessageDestroy}
                                    />
                            }
                            <Link to={`/messages/${this.props.resource.id}`} target="_false">
                                <MenuItem
                                    leftIcon={<LinkIcon />}
                                    style={{ cursor: 'pointer' }}
                                    primaryText={this.context.translation.t('actions.openMessage')}
                                />
                            </Link>
                            <MenuItem
                                leftIcon={<ReportIcon />}
                                style={{ cursor: 'pointer' }}
                                primaryText={this.context.translation.t('actions.report')}
                                onTouchTap={this.handleMessageReport}
                            />

                        </IconMenu>
                    </div>
                    <MessageDialog
                        modal={false}
                        open={this.state.messageEditDialogOpen}
                        onRequestClose={this.handleCloseMessageEditDialog}
                        sender={this.context.currentUserPage}
                        recipient={this.props.recipient}
                        initialValues={this.props.resource.data}
                        id={this.props.resource.id}
                        formKey={this.props.resource.id}
                    />
                </PageCardHeader>
                <Divider inset />
                <CardText>
                    <Marked body={this.props.resource.data.body} />
                </CardText>
                <Comments
                    messageId={this.props.resource.id}
                    parentId={null}
                />
            </Card>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Message);
