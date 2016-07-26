import React, { PropTypes } from 'react';
import PureRenderMixin from 'components/pure-render-mixin';

import CreateContentIcon from 'material-ui/svg-icons/content/create';

import MessageDialog from './message-dialog';
import Message from './message';
import FloatingActionButton from 'components/floating-action-button';

import Loader from 'components/loader';

const Messages = React.createClass({
    propTypes: {
        resources: PropTypes.object.isRequired,
        onLoadMore: PropTypes.func.isRequired,
        hasMore: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired,
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
                <Message
                    key={message.id}
                    message={message}
                />
            )
        );
    },

    render() {
        return (
            <div>
                <Loader
                    onLoadMore={this.props.onLoadMore}
                    hasMore={this.props.hasMore}
                    loadingMore={this.props.loadingMore}
                >
                    {this.renderMessages()}
                </Loader>
                <FloatingActionButton
                    onMouseUp={this.handleOpenMessageCreationModal}
                >
                    <CreateContentIcon />
                </FloatingActionButton>
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
