import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import { connect } from 'react-redux';

import RefreshIndicator from 'material-ui/RefreshIndicator';

import actionCreators from 'action-creators';
import api from 'api';
import Immutable from 'immutable';

import Posts from './posts';

const emptyPosts = Immutable.Map({});

function mapStateToProps(state, props) {
    if (props.page.type === 'main_pages') {
        return ({ posts: state.posts });
    }

    return ({ posts: state.postsByPage.get(props.page.id) || emptyPosts });
}

const PostsContainer = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        posts: PropTypes.object.isRequired,
        clearPosts: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired,
        currentUserPage: PropTypes.object,
        page: PropTypes.object.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

    getInitialState() {
        return {
            page: 1,
            loadingMore: false,
            hasMore: false,
            lastPostDate: null,
            updateCount: 0,
            postCreationModalOpen: false
        };
    },

    componentDidMount() {
        this.props.clearPosts();
        this.loadPosts(this.props.params.pageId, 1);
    },

    componentWillReceiveProps(newProps) {
        if (this.props.params.pageId !== newProps.params.pageId) {
            this.props.clearPosts();
            this.loadPosts(newProps.params.pageId, 1);
        }
    },

    loadPosts(pageId, pageNum) {
        const query = { include: 'sender,recipient,comments,comments.received_likes' };

        if (pageId) {
            query['filter[participant_id]'] = pageId;
        }

        query['page[number]'] = pageNum;
        query['page[size]'] = 10;
        query.sort = '-updated_at';

        this.setState({ loadingMore: true });

        api.posts.find(query).then((response) => {
            this.props.addResource(response);

            if (response.data.length > 0) {
                this.setState({ lastPostDate: response.data[0].updated_at });
            }
            this.setState({ hasMore: !!(response.links && response.links.next), loadingMore: false });
        });
    },

    handleLoadUpdates() {
        this.setState({ updateCount: 0 });
        this.loadPosts(this.props.params.pageId, 1);
    },

    handleLoadMore() {
        const nextPage = this.state.page + 1;
        console.log(nextPage);

        this.setState({ page: nextPage });
        this.loadPosts(this.props.params.pageId, nextPage);
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
            <Posts
                posts={this.props.posts}
                page={this.props.page}
                onLoadMore={this.handleLoadMore}
                onLoadUpdates={this.handleLoadUpdates}
                updateCount={this.state.updateCount}
                hasMore={this.state.hasMore}
                loadingMore={this.state.loadingMore}
                currentUserPage={this.props.currentUserPage}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(PostsContainer);
