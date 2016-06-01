import React, { PropTypes } from "react";

import CSSModules from "react-css-modules";
import styles from "./posts.css";

import {
    List,
    FlatButton
} from "material-ui";

import FloatingActionButton from "material-ui/FloatingActionButton";
import CreateContentIcon from "material-ui/svg-icons/content/create";

import PostDialog from "components/post-dialog";

import Post from "components/Post";

const Posts = React.createClass({
    propTypes: {
        posts: PropTypes.object.isRequired,
        onLoadUpdates: PropTypes.func,
        onLoadMore: PropTypes.func
    },

    contextTypes: {
        currentUserPage: PropTypes.object.isRequired
    },

    getInitialState() {
        return { postCreationModalOpen: false };
    },

    handleOpenPostCreationModal() {
        this.setState({ postCreationModalOpen: true });
    },

    handleClosePostCreationModal() {
        this.setState({ postCreationModalOpen: false });
    },

    updatesButton() {
        if (this.props.updateCount > 0) {
            return (
                <FlatButton
                    label={this.context.translation.t("actions.loadPostUpdates")}
                    style={{ width: "100%", padding: 8 }}
                    onClick={this.props.onLoadUpdates}
                />
            );
        }
        return (null);
    },

    moreButton() {
        if (this.props.hasMore) {
            return (
                <FlatButton
                    label={this.context.translation.t("actions.loadMorePosts")}
                    style={{ width: "100%", padding: 8 }}
                    onClick={this.props.onLoadMore}
                />
            );
        }
        return (null);
    },

    render() {
        const orderedPosts = this.props.posts.sort((post1, post2) => (post1["updated-at"] > post2["updated-at"] ? -1 : 1));

        const postNodes = orderedPosts.valueSeq().map(post =>
            <Post key={post.id} post={post} />
        );

        return (
            <div>
                <div>
                    {this.updatesButton()}
                    <List>
                        {postNodes}
                    </List>
                    {this.moreButton()}
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

export default CSSModules(Posts, styles);
