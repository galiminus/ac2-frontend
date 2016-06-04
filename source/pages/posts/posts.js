import React, { PropTypes } from 'react';

import CSSModules from 'react-css-modules';
import styles from './posts.css';

import List from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import CreateContentIcon from 'material-ui/svg-icons/content/create';
import RefreshIcon from 'material-ui/svg-icons/navigation/arrow-upward';

import PostDialog from 'components/post-dialog';

import Post from 'components/post';


const Posts = React.createClass({
    propTypes: {
        posts: PropTypes.object.isRequired,
        onLoadUpdates: PropTypes.func,
        onLoadMore: PropTypes.func,
        updateCount: PropTypes.number,
        hasMore: PropTypes.bool.isRequired
    },

    contextTypes: {
        translation: PropTypes.object.isRequired,
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
                        {this.context.translation.t('actions.loadPostUpdates')}
                    </div>
                </div>
            </RaisedButton>
        );
    },

    moreButton() {
        if (this.props.hasMore) {
            return (
                <FlatButton
                    label={this.context.translation.t('actions.loadMorePosts')}
                    style={{
                        width: 300, padding: 8
                    }}
                    onClick={this.props.onLoadMore}
                />
            );
        }
        return (null);
    },

    render() {
        const orderedPosts = this.props.posts.sort((post1, post2) => (post1.updated_at > post2.updated_at ? -1 : 1));

        const postNodes = orderedPosts.valueSeq().map(post =>
            <Post key={post.id} post={post} />
        );

        return (
            <div>
                <div>
                    <div style={{ textAlign: 'center' }}>
                        {
                            () => {
                                if (this.props.updateCount > 0) {
                                    return (this.updatesButton());
                                }
                            }()
                        }
                    </div>
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
