import React, { PropTypes } from "react";
import { connect } from "react-redux";

import {
    List,
    FlatButton
} from "material-ui";

import PostForm from "components/post-form";

import actions from "action-creators";
import api from "api";
import { Post, ActionCable } from "components";

function mapStateToProps(state, props) {
    let posts;

    if (!props.params.pageId) {
        posts = state.posts;
    } else {
        posts = state.posts.filter((post) => {
            return (post.sender_id === props.params.pageId || post.recipient_id === props.params.pageId);
        });
    }

    return {
        posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clear: () => dispatch(actions.posts.clear())
    };
}

const Posts = React.createClass({
    propTypes: {
        params: PropTypes.object.isRequired,
        posts: PropTypes.object.isRequired,
        currentUserPage: PropTypes.object.isRequired,
        translations: PropTypes.object.isRequired
    },

    getInitialState() {
        return { page: 1, hasMore: false, lastPostDate: null, updateCount: 0 };
    },

    componentDidMount() {
        this.props.clear();
        this.loadPosts(this.props.params.pageId, 1);
    },

    componentWillReceiveProps(newProps) {
        if (this.props.params.pageId !== newProps.params.pageId) {
            this.props.clear();
            this.loadPosts(newProps.params.pageId, 1);
        }
    },

    loadPosts(pageId, pageNum) {
        const query = { include: "sender,recipient" };

        if (pageId) {
            query["filter[participant_id]"] = pageId;
        }

        query["page[number]"] = pageNum;
        query["page[size]"] = 25;
        query.sort = "-updated_at";

        api.posts.find(query).then((response) => {
            if (response.data.length > 0) {
                this.setState({ lastPostDate: response.data[0].updated_at });
            }
            this.setState({ hasMore: !!(response.links && response.links.next), loadDate: null });
        });
    },

    loadUpdates() {
        this.setState({ updateCount: 0 });
    },

    loadUpdatesButton() {
        if (this.state.updateCount > 0) {
            return (
                <FlatButton
                    label={this.props.translations.t("actions.loadPostUpdates")}
                    style={{ width: "100%", padding: 8 }}
                    onClick={this.loadMorePosts}
                />
            );
        }
        return (null);
    },

    loadMorePosts() {
        const nextPage = this.state.page + 1;

        this.setState({ page: nextPage });
        this.loadPosts(this.props.params.pageId, nextPage);
    },

    loadMoreButton() {
        if (this.state.hasMore) {
            return (
                <FlatButton
                    label={this.props.translations.t("actions.loadMorePosts")}
                    style={{ width: "100%", padding: 8 }}
                    onClick={this.loadMorePosts}
                />
            );
        }
        return (null);
    },

    handleMessage(message) {
        if (message) {
            this.setState({ updateCount: this.state.updateCount + 1 });
        }
    },

    render() {
        const postNodes = this.props.posts.valueSeq().map(post =>
            <Post key={post.id} post={post} currentUserPage={this.props.currentUserPage} translations={this.props.translations} />
        );

        return (
            <ActionCable channel="PostsChannel" onMessage={this.handleMessage}>
                <div className="container-fluid" style={{ paddingTop: 12 }}>
                    <div className="col-md-6 col-md-offset-3 col-sm-8 col-xs-12">
                        <PostForm className="col-xs-12" translations={this.props.translations} />
                        {this.loadUpdatesButton()}
                        <List>
                            {postNodes}
                        </List>
                        {this.loadMoreButton()}
                    </div>
                </div>
            </ActionCable>
        );
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
