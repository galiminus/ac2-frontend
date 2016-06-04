import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import Immutable from 'immutable';

import actionCreators from 'action-creators';

import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import PlusOneIcon from 'material-ui/svg-icons/social/plus-one';
import DeleteIcon from "material-ui/svg-icons/action/delete-forever";
import EditIcon from "material-ui/svg-icons/editor/mode-edit";

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import api from 'api';
import PageAvatar from 'components/page-avatar';
import PageLink from 'components/page-link';
import PlusCounter from 'components/plus-counter';
import Marked from 'components/marked';
import CreationDate from 'components/creation-date';

function mapStateToProps(state, props) {
    return {
        sender: state.pages.get(props.comment.sender_id),
        likes: state.likes.filter((like) => like.liked_id === props.comment.id)
    };
}

const Comment = React.createClass({
    propTypes: {
        sender: PropTypes.object.isRequired,
        comment: PropTypes.object.isRequired,
        addResource: PropTypes.func.isRequired,
        removeResource: PropTypes.func.isRequired,
        likes: PropTypes.object
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            sender: { id: null },
            likes: Immutable.Map({})
        };
    },

    shouldComponentUpdate(props) {
        return (this.props.likes.size !== props.likes.size);
    },

    myLike() {
        return (this.props.likes.find((like) => like.page_id === this.context.currentUserPage.id));
    },

    handleLikeCreate() {
        api.likes.create({
            liked_id: this.props.comment.id,
            liked_type: 'Comment'
        }).then((response) => {
            this.props.addResource(response);
        });
    },

    handleLikeDestroy() {
        const id = this.myLike().id;
        api.likes.destroy(id).then(() => {
            this.props.removeResource(id);
        });
    },

    handleCommentDestroy() {
        api.comments.destroy(this.props.comment.id).then(() => {
            this.props.removeResource(this.props.comment.id);
        });
    },

    render() {
        const isLiked = !!this.myLike();

        switch (this.props.sender.type) {
        case 'profile_pages':
            return (
                <ListItem
                    leftAvatar={
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <PageAvatar page={this.props.sender} />
                            <CreationDate
                                date={this.props.comment.created_at}
                                style={{
                                    lineHeight: '26px',
                                    fontSize: 12,
                                    color: '#999',
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
                    secondaryText={<Marked body={this.props.comment.data.body} />}
                    rightIconButton={
                        <div style={{ display: 'flex' }}>
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
                                        <MoreVertIcon color="#999" />
                                    </IconButton>
                                }
                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                style={{ margin: '0px 0px 0px -10px' }}
                            >
                                <MenuItem
                                    leftIcon={<EditIcon />}
                                    primaryText={this.context.translation.t('actions.edit')}
                                    onClick={this.handleOpenCommentEditModal}

                                />
                                <MenuItem
                                    leftIcon={<DeleteIcon />}
                                    primaryText={this.context.translation.t('actions.destroy')}
                                    onClick={this.handleCommentDestroy}
                                />
                            </IconMenu>
                        </div>
                    }
                />
            );

        default:
            return (<div />);
        }
    }
});

export default connect(mapStateToProps, actionCreators)(Comment);
