import React, { PropTypes } from "react";
import { connect } from "react-redux";

import CSSModules from "react-css-modules";
import styles from "./posts.css";

import {
    List,
    FlatButton
} from "material-ui";

import FloatingActionButton from "material-ui/FloatingActionButton";
import CreateContentIcon from "material-ui/svg-icons/content/create";

import PostDialog from "components/post-dialog";

import actionCreators from "action-creators";
import connectToCable from "components/action-cable";
import api from "api";
import { Post } from "components";

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
        posts: posts.sort((post1, post2) => (post1["updated-at"] > post2["updated-at"] ? -1 : 1))
    };
}

const Posts = React.createClass({
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
        return (["PostsChannel"]);
    },

    loadPosts(pageId, pageNum) {
        const query = { include: "sender,recipient,comments,comments.likes" };

        if (pageId) {
            query["filter[participant_id]"] = pageId;
        }

        query["page[number]"] = pageNum;
        query["page[size]"] = 20;
        query.sort = "-updated_at";

        api.posts.find(query).then((response) => {
            this.props.addResource(response);

            if (response.data.length > 0) {
                this.setState({ lastPostDate: response.data[0]['updated-at'] });
            }
            this.setState({ hasMore: !!(response.links && response.links.next), loadDate: null });
        });
    },

    loadUpdates() {
        this.setState({ updateCount: 0 });
        this.props.clearPosts();
        this.loadPosts(this.props.params.pageId, 1);
    },

    loadUpdatesButton() {
        if (this.state.updateCount > 0) {
            return (
                <FlatButton
                    label={this.context.translation.t("actions.loadPostUpdates")}
                    style={{ width: "100%", padding: 8 }}
                    onClick={this.loadUpdates}
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
                    label={this.context.translation.t("actions.loadMorePosts")}
                    style={{ width: "100%", padding: 8 }}
                    onClick={this.loadMorePosts}
                />
            );
        }
        return (null);
    },

    handleOpenPostCreationModal() {
        this.setState({ postCreationModalOpen: true });
    },

    handleClosePostCreationModal() {
        this.setState({ postCreationModalOpen: false });
    },

    handleMessage(message) {
        console.log(message);
        if (message &&
            message.data.attributes.created_at === message.data.attributes["updated-at"] &&
            message.data.relationships.sender.data.id !== this.context.currentUserPage.id) {
            this.setState({ updateCount: this.state.updateCount + 1 });
        }
    },

    render() {
        const postNodes = this.props.posts.valueSeq().map(post =>
            <Post key={post.id} post={post} />
        );

        return (
            <div>
                <div>
                    {this.loadUpdatesButton()}
                    <List>
                        {postNodes}
                    </List>
                    {this.loadMoreButton()}
                </div>
                <FloatingActionButton styleName="addPostButton" onMouseUp={this.handleOpenPostCreationModal}>
                    <CreateContentIcon />
                </FloatingActionButton>
                <PostDialog
                    contentStyle={{ width: 500 }}
                    modal={false}
                    open={this.state.postCreationModalOpen}
                    onRequestClose={this.handleClosePostCreationModal}
                    sender={this.context.currentUserPage}
                />
            </div>
        );
    }
});

export default connect(mapStateToProps, actionCreators)(connectToCable(CSSModules(Posts, styles)));
