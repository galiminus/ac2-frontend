import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import CSSModules from 'react-css-modules';
import styles from './messages.css';

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
        currentUserPage: PropTypes.object.isRequired,
        page: PropTypes.object,
        translation: PropTypes.object.isRequired
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
                    currentUserPage={this.props.currentUserPage}
                    translation={this.props.translation}
                />
            )
        );
    },

    render() {
        return (
            <div>
                <Loader
                    styles={styles}
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
                    sender={this.props.currentUserPage}
                    recipient={this.props.page}
                    translation={this.props.translation}
                />
            </div>
        );
    }
});

export default CSSModules(Messages, styles);
