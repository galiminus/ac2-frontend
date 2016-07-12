import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import actionCreators from 'action-creators';
import api from 'api';
import { find } from 'api/http';

import Immutable from 'immutable';

import Messages from './messages';

const emptyMessages = Immutable.Map({});

function mapStateToProps(state, props) {
    if (props.page.type === 'Page::Main') {
        return ({ messages: state.messages });
    }

    return ({ messages: state.messagesByPage.get(props.page.id) });
}

const MessagesContainer = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        messages: PropTypes.object.isRequired,
        clearMessages: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        page: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getDefaultProps() {
        return ({
            messages: emptyMessages
        });
    },

    getInitialState() {
        return {
            page: 1,
            loadingMore: false,
            hasMore: false,
            lastMessageDate: null,
            updateCount: 0,
            messageCreationModalOpen: false
        };
    },

    componentDidMount() {
        this.props.clearMessages();
        this.loadMessages(this.props.params.pageId, 1);
    },

    componentWillReceiveProps(newProps) {
        if (this.props.params.pageId !== newProps.params.pageId) {
            this.props.clearMessages();
            this.loadMessages(newProps.params.pageId, 1);
        }
    },

    loadMessages(pageId, pageNum) {
        const query = { include: 'received_likes,sender,recipient,comments,comments.received_likes' };

        if (pageId) {
            query['filter[participant_id]'] = pageId;
        }
        query['filter[type]'] = 'Message::Post';

        query['page[number]'] = pageNum;
        query['page[size]'] = 10;
        query.sort = '-updated_at';

        this.setState({ loadingMore: true });

        api.messages.find(query)
            .then(
                (response) => {
                    this.props.addResource(response);

                    if (response.data.length > 0) {
                        this.setState({ lastMessageDate: response.data[0].updated_at });
                    }
                    this.setState({ hasMore: !!(response.links && response.links.next), loadingMore: false });
                },
                (error) => {
                    this.props.pushNotification('messages_find_fatal_error');
                }
            );
    },

    handleLoadUpdates() {
        this.setState({ updateCount: 0 });
        this.loadMessages(this.props.params.pageId, 1);
    },

    handleLoadMore() {
        const nextPage = this.state.page + 1;

        this.setState({ page: nextPage });
        this.loadMessages(this.props.params.pageId, nextPage);
    },
    //
    // handleMessage(message) {
    //     if (message) {
    //         switch (message.meta.action) {
    //         case 'create':
    //         case 'update':
    //             if (message.data.attributes.created_at === message.data.attributes.updated_at &&
    //                 message.data.relationships.sender.data.id !== this.props.currentUserPage.id) {
    //                 this.setState({ updateCount: this.state.updateCount + 1 });
    //             }
    //             break;
    //         case 'destroy':
    //             this.props.removeResource(message.data);
    //             break;
    //         default:
    //             break;
    //         }
    //     }
    // },

    render() {
        return (
            <Messages
                messages={this.props.messages}
                page={this.props.page}
                onLoadMore={this.handleLoadMore}
                onLoadUpdates={this.handleLoadUpdates}
                updateCount={this.state.updateCount}
                hasMore={this.state.hasMore}
                loadingMore={this.state.loadingMore}
                currentUserPage={this.props.currentUserPage}
                translation={this.props.translation}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(MessagesContainer);
