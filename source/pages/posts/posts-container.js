import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import actionCreators from 'action-creators';
import connectToCable from 'components/action-cable';
import api from 'api';

import Posts from './posts';

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

const PostsContainer = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        posts: PropTypes.object.isRequired,
        clearPosts: PropTypes.func.isRequired,
        addResource: PropTypes.func.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired
    },

    getInitialState() {
        return { page: 1, hasMore: false, lastPostDate: null, updateCount: 0, postCreationModalOpen: false };
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

    getChannels() {
        return (['PostsChannel']);
    },

    loadPosts(pageId, pageNum) {
        const query = { include: 'sender,recipient,comments,comments.likes' };

        if (pageId) {
            query['filter[participant_id]'] = pageId;
        }

        query['page[number]'] = pageNum;
        query['page[size]'] = 20;
        query.sort = '-updated_at';

        api.posts.find(query).then((response) => {
            this.props.addResource(response);

            if (response.data.length > 0) {
                this.setState({ lastPostDate: response.data[0]['updated-at'] });
            }
            this.setState({ hasMore: !!(response.links && response.links.next), loadDate: null });
        });
    },

    handleLoadUpdates() {
        this.setState({ updateCount: 0 });
        this.props.clearPosts();
        this.loadPosts(this.props.params.pageId, 1);
    },


    handleLoadMore() {
        const nextPage = this.state.page + 1;

        this.setState({ page: nextPage });
        this.loadPosts(this.props.params.pageId, nextPage);
    },

    handleMessage(message) {
        if (message &&
            message.data.attributes.created_at === message.data.attributes['updated-at'] &&
            message.data.relationships.sender.data.id !== this.context.currentUserPage.id) {
            this.setState({ updateCount: this.state.updateCount + 1 });
        }
    },

    render() {
        return (
            <Posts
                posts={this.props.posts}
                onLoadMore={this.handleLoadMore}
                onLoadUpdates={this.handleLoadUpdates}
                updateCount={this.state.updateCount}
                hasMore={this.state.hasMore}
            />
        );
    }
});

export default connect(mapStateToProps, actionCreators)(connectToCable(PostsContainer));
