import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

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

import PageCardHeader from 'components/pages/page-card-header';
import Comments from 'components/comments/comments';
import Marked from 'components/marked/marked';
import CreationDate from 'components/creation-date';
import PlusCounter from 'components/plus-counter';

import MessageDialog from './message-dialog';

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.message.sender_id),
        recipient: state.pages.get(props.message.recipient_id),
        likes: state.likesByMessage.get(props.message.id)
    };
}

const defaultProps = {
    likes: Immutable.Map({}),
    currentUserPage: {
        id: null,
        type: ''
    }
};

const Message = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        recipient: PropTypes.object,
        message: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        removeResource: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        likes: PropTypes.object.isRequired,
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return (defaultProps);
    },

    getInitialState() {
        return { messageEditModalOpen: false };
    },

    handleOpenMessageEditModal() {
        this.setState({ messageEditModalOpen: true });
    },

    handleCloseMessageEditModal() {
        this.setState({ messageEditModalOpen: false });
    },

    handleMessageDestroy() {
        api.messages.destroy(this.props.message.id).then(() => {
            this.props.removeResource(this.props.message);
        });
    },

    myLike() {
        return (this.props.likes.find((like) => like.permissions.destroy));
    },

    handleLikeCreate() {
        api.likes.create({
            liked_id: this.props.message.id,
            liked_type: 'Message'
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
                        <CreationDate date={this.props.message.created_at} />
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
                                    if (this.props.message.permissions.update) {
                                        return (
                                            <MenuItem
                                                leftIcon={<EditIcon />}
                                                primaryText={this.props.translation.t('actions.edit')}
                                                onClick={this.handleOpenMessageEditModal}
                                            />
                                        );
                                    }
                                })()
                            }

                            {
                                (() => {
                                    if (this.props.message.permissions.destroy) {
                                        return (
                                            <MenuItem
                                                leftIcon={<DeleteIcon />}
                                                primaryText={this.props.translation.t('actions.destroy')}
                                                onClick={this.handleMessageDestroy}
                                            />
                                        );
                                    }
                                })()
                            }
                            <MenuItem
                                leftIcon={<ReportIcon />}
                                primaryText={this.props.translation.t('actions.report')}
                                onClick={this.handleMessageReport}
                            />

                        </IconMenu>
                    </div>
                    <MessageDialog
                        contentStyle={{ width: 500 }}
                        modal={false}
                        open={this.state.messageEditModalOpen}
                        onRequestClose={this.handleCloseMessageEditModal}
                        sender={this.props.currentUserPage}
                        recipient={this.props.recipient}
                        initialValues={this.props.message.data}
                        id={this.props.message.id}
                        formKey={this.props.message.id}
                        translation={this.props.translation}
                    />
                </PageCardHeader>
                <Divider inset />
                <CardText>
                    <Marked body={this.props.message.data.body} />
                </CardText>
                <Comments
                    messageId={this.props.message.id}
                    parentId={null}
                    currentUserPage={this.props.currentUserPage}
                    translation={this.props.translation}
                />
            </Card>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(Message);
