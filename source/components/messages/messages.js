import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import InfiniteScroll from 'redux-infinite-scroll';

import CSSModules from 'react-css-modules';
import styles from './messages.css';

import List from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import CreateContentIcon from 'material-ui/svg-icons/content/create';
import RefreshIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import MessageDialog from './message-dialog';

import Message from './message';

const Messages = React.createClass({
    propTypes: {
        messages: PropTypes.object.isRequired,
        onLoadUpdates: PropTypes.func,
        onLoadMore: PropTypes.func,
        updateCount: PropTypes.number,
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

    updatesButton() {
        return (
            <RaisedButton
                style={{
                    marginTop: 16,
                    position: 'absolute',
                    width: 300,
                    marginLeft: -150,
                    zIndex: 2
                }}
                rippleStyle={{ borderRadius: 24 }}
                primary
                styleName="loadMoreButton"
                onClick={this.props.onLoadUpdates}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        color: '#fff'
                    }}
                >
                    <RefreshIcon style={{ height: 34 }} color="#fff" />
                    <div>
                        {this.props.translation.t('actions.loadMessageUpdates')}
                    </div>
                </div>
            </RaisedButton>
        );
    },

    renderMessages() {
        const orderedMessages = this.props.messages.sort((message1, message2) => (message1.updated_at > message2.updated_at ? -1 : 1));

        return (
            orderedMessages.valueSeq().map(message =>
                <Message
                    key={message.id}
                    message={message}
                    currentUserPage={this.props.currentUserPage}
                    translation={this.props.translation}
                />
            ).toJS()
        );
    },

    render() {
        return (
            <div>
                <div style={{ textAlign: 'center' }}>
                    {
                        (() => {
                            if (this.props.updateCount > 0) {
                                return (this.updatesButton());
                            }
                        })()
                    }
                </div>
                <List>
                    <InfiniteScroll
                        elementIsScrollable={false}
                        loadMore={this.props.onLoadMore}
                        hasMore={this.props.hasMore}
                        loadingMore={this.props.loadingMore}
                        loader={
                            <div
                                style={{
                                    position: 'relative',
                                    margin: '60px auto 30px auto',
                                    width: 50
                                }}
                            >
                                <RefreshIndicator
                                    size={50}
                                    top={0}
                                    left={0}
                                    loadingColor="#ff9800"
                                    status="loading"
                                    style={{
                                        position: 'relative',
                                        display: 'inline-block'
                                    }}
                                />
                            </div>
                        }
                    >
                        {this.renderMessages()}
                    </InfiniteScroll>
                </List>
                <FloatingActionButton
                    styleName="addMessageButton"
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
