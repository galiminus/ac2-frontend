import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import PageCardHeader from 'components/page-card-header';
import Comments from 'components/comments';
import Marked from 'components/marked';
import PostDialog from 'components/post-dialog';

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
        post: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
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

    render() {
        return (
            <Card style={{ marginTop: 24, fontSize: '0.9em', lineHeight: '1.4em' }}>
                <PageCardHeader sender={this.props.sender} recipient={this.props.recipient}>
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        style={{ float: "right", margin: -10 }}
                    >
                        <MenuItem
                            primaryText={this.context.translation.t('actions.edit')}
                            onClick={this.handleOpenPostEditModal}
                        />
                        <MenuItem
                            primaryText={this.context.translation.t('actions.destroy')}
                        />
                    </IconMenu>
                    <PostDialog
                        contentStyle={{ width: 500 }}
                        modal={false}
                        open={this.state.postEditModalOpen}
                        onRequestClose={this.handleClosePostEditModal}
                        sender={this.context.currentUserPage}
                        initialValues={this.props.post.data}
                        id={this.props.post.id}
                    />
                </PageCardHeader>
                <Divider inset />
                <CardText>
                    <Marked body={this.props.post.data.body} />
                </CardText>
                <Comments
                    postId={this.props.post.id}
                    parentId={null}
                />
            </Card>
        );
    }
});

export default connect(mapStateToProps)(Post);
