import React, { PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import InfiniteScroll from 'redux-infinite-scroll';

import CSSModules from 'react-css-modules';
import styles from './posts.css';

import List from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import CreateContentIcon from 'material-ui/svg-icons/content/create';
import RefreshIcon from 'material-ui/svg-icons/navigation/arrow-upward';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import PostDialog from 'components/post-dialog';

import Post from 'components/post';

const Posts = React.createClass({
    propTypes: {
        posts: PropTypes.object.isRequired,
        onLoadUpdates: PropTypes.func,
        onLoadMore: PropTypes.func,
        updateCount: PropTypes.number,
        hasMore: PropTypes.bool.isRequired,
        loadingMore: PropTypes.bool.isRequired,
        currentUserPage: PropTypes.object,
        page: PropTypes.object
    },

    contextTypes: {
        translation: PropTypes.object.isRequired
    },

    mixins: [PureRenderMixin],

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

    renderPosts() {
        const orderedPosts = this.props.posts.sort((post1, post2) => (post1.updated_at > post2.updated_at ? -1 : 1));

        return(
            orderedPosts.valueSeq().map(post =>
                <Post key={post.id} post={post} currentUserPage={this.props.currentUserPage} />
            ).toJS()
        );
    },

    render() {
        console.log(this.renderPosts().length, this.props.loadingMore);
        return (
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
                        {this.renderPosts()}
                    </InfiniteScroll>
                </List>
                <FloatingActionButton styleName="addPostButton" onMouseUp={this.handleOpenPostCreationModal}>
                    <CreateContentIcon />
                </FloatingActionButton>
                <PostDialog
                    contentStyle={{ width: 500 }}
                    modal={false}
                    open={this.state.postCreationModalOpen}
                    onRequestClose={this.handleClosePostCreationModal}
                    sender={this.props.currentUserPage}
                    recipient={this.props.page}
                />
            </div>
        );
    }
});

export default CSSModules(Posts, styles);
