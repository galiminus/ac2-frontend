import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import CreateContentIcon from 'material-ui/svg-icons/content/create';

import PhotoIcon from 'material-ui/svg-icons/image/photo-camera';
import QuizzIcon from 'material-ui/svg-icons/toggle/check-box';
import PollsIcon from 'material-ui/svg-icons/social/poll';
import PostIcon from 'material-ui/svg-icons/editor/insert-comment';

import MessageDialog from './message-dialog';
import Message from './message';
import FloatingActionMenu from 'components/floating-action-menu';
import FloatingActionButton from 'components/floating-action-button';

import Loader from 'components/loader';

const Messages = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired,
        page: PropTypes.object
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return { messageCreationModalOpen: false };
    },

    handleOpenMessageCreationModal() {
        this.setState({ messageCreationModalOpen: true });
    },

    handleCloseMessageCreationModal() {
        this.setState({ messageCreationModalOpen: false });
    },

    renderMessages() {
        return (
            this.props.resources.valueSeq().map(message =>
                <Message key={message.id} resource={message} />
            )
        );
    },

    render() {
        return (
            <div>
                <Loader {...this.props}>
                    {this.renderMessages()}
                </Loader>
                <FloatingActionMenu
                    icon={<CreateContentIcon />}
                >
                    <FloatingActionButton
                        onMouseUp={this.handleOpenMessageCreationModal}
                    >
                        <PostIcon />
                    </FloatingActionButton>
                    <FloatingActionButton
                        onMouseUp={this.handleOpenMessageCreationModal}
                    >
                        <PollsIcon />
                    </FloatingActionButton>
                    <FloatingActionButton
                        onMouseUp={this.handleOpenMessageCreationModal}
                    >
                        <QuizzIcon />
                    </FloatingActionButton>
                    <FloatingActionButton
                        onMouseUp={this.handleOpenMessageCreationModal}
                    >
                        <PhotoIcon />
                    </FloatingActionButton>
                </FloatingActionMenu>
                <MessageDialog
                    modal={false}
                    open={this.state.messageCreationModalOpen}
                    onRequestClose={this.handleCloseMessageCreationModal}
                    sender={this.context.currentUserPage}
                    recipient={this.props.page}
                />
            </div>
        );
    }
});

export default Messages;
