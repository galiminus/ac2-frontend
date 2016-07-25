import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ReportIcon from 'material-ui/svg-icons/content/report';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import PageAvatar from 'components/pages/page-avatar';
import PageLink from 'components/pages/page-link';
import PlusCounter from 'components/plus-counter';
import PlusButton from 'components/plus-button';
import Marked from 'components/marked/marked';
import CreationDate from 'components/creation-date';
import CommentDialog from './comment-dialog';

const Comment = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        comment: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        likes: PropTypes.object.isRequired,
        commentEditModalOpen: PropTypes.bool.isRequired,
        onLikeDestroy: PropTypes.func.isRequired,
        onLikeCreate: PropTypes.func.isRequired,
        onCommentDestroy: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired,
        myLike: PropTypes.object,
        onOpenCommentEditModal: PropTypes.func,
        onCommentReport: PropTypes.func,
        onCloseCommentEditModal: PropTypes.func
    },

    contextTypes: {
        muiTheme: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    render() {
        const isLiked = !!this.props.myLike;

        if (this.props.sender.type.match(/^Page::Profile/)) {
            return (
                <div>
                    <ListItem
                        disabled
                        leftAvatar={
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <PageAvatar page={this.props.sender} />
                                <CreationDate
                                    date={this.props.comment.created_at}
                                    style={{
                                        lineHeight: '26px',
                                        fontSize: 12,
                                        color: this.context.muiTheme.palette.accent3Color,
                                        textAlign: 'center',
                                        marginLeft: -8
                                    }}
                                />
                            </div>
                        }
                        primaryText={
                            <div>
                                <PageLink page={this.props.sender} />
                                <PlusCounter likes={this.props.likes} />
                            </div>
                        }
                        secondaryText={
                            <Marked body={this.props.comment.data.body} />
                        }
                        rightIconButton={
                            <div style={{ display: 'flex' }}>
                                <PlusButton
                                    onLike={this.props.onLikeCreate}
                                    onUnlike={this.props.onLikeDestroy}
                                    isSelected={isLiked}
                                />
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton>
                                            <MoreVertIcon color={this.context.muiTheme.palette.accent3Color} />
                                        </IconButton>
                                    }
                                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    style={{ margin: '0px 0px 0px -10px' }}
                                >
                                    {this.props.comment.permissions.update &&
                                        <MenuItem
                                            leftIcon={<EditIcon />}
                                            primaryText={this.props.translation.t('actions.edit')}
                                            onClick={this.props.onOpenCommentEditModal}
                                        />
                                    }
                                    {this.props.comment.permissions.destroy &&
                                        <MenuItem
                                            leftIcon={<DeleteIcon />}
                                            primaryText={this.props.translation.t('actions.destroy')}
                                            onClick={this.props.onCommentDestroy}
                                        />
                                    }
                                    <MenuItem
                                        leftIcon={<ReportIcon />}
                                        primaryText={this.props.translation.t('actions.report')}
                                        onClick={this.props.onCommentReport}
                                    />
                                </IconMenu>
                            </div>
                        }
                    />
                    <CommentDialog
                        modal={false}
                        open={this.props.commentEditModalOpen}
                        onRequestClose={this.props.onCloseCommentEditModal}
                        sender={this.props.sender}
                        initialValues={this.props.comment.data}
                        id={this.props.comment.id}
                        formKey={this.props.comment.id}
                        translation={this.props.translation}
                    />
                </div>
            );
        }
        return (<div />);
    }
});

export default Comment;
