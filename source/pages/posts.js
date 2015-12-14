import React from "react"
import { connect } from 'react-redux'

import {
    List,
    FlatButton
} from "material-ui"

import PostForm from "components/post-form"

import { posts } from "api"
import { pagesPosts } from "action-creators"
import { Post } from "components"

function mapStateToProps(state, props) {
    let posts
    if (!props.params.pageId) {
        posts = state.posts
    }
    else {
        posts = state.posts.filter((post) => {
            return (post.sender_id == props.params.pageId || post.recipient_id == props.params.pageId)
        })
    }

    return {
        posts: state.posts.sort((post1, post2) => (post1.updated_at > post2.updated_at ? 0 : 1))
    }
}

function mapDispatchToProps(dispatch) {
    return {
        clearPosts: (pageId) => dispatch(pagesPosts.clear(pageId)),
        pushPosts: (pageId, postIds) => dispatch(pagesPosts.push(pageId, postIds))
    }
}

const Posts = React.createClass({
    getInitialState() {
        return { page: 1 }
    },

    componentDidMount() {
        this.props.clearPosts(this.props.params.pageId)
        this.loadPosts(this.props.params.pageId, 1)
    },

    componentWillReceiveProps(newProps) {
        if (this.props.params.pageId != newProps.params.pageId) {
            this.props.clearPosts(newProps.params.pageId)
            this.loadPosts(newProps.params.pageId, 1)
        }
    },

    loadPosts(pageId, pageNum) {
        let query = { include: "sender,recipient" }

        if (pageId) {
            query["filter[participant_id]"] = pageId
        }

        query["page[number]"] = pageNum
        query["page[size]"] = 25
        query["sort"] = "-updated_at"

        posts.find(query).then((postIds) => this.props.pushPosts(pageId, postIds))
    },

    loadMorePosts() {
        const nextPage = this.state.page + 1

        this.setState({ page: nextPage })
        this.loadPosts(this.props.params.pageId, nextPage)
    },

    render: function() {
        const posts = this.props.posts.map(post => <Post key={post.id} post={post} />)
        return (
            <div className="container-fluid" style={{paddingTop: 12}}>
                <div className="col-md-8 col-sm-8 col-xs-12">
                    <PostForm className="col-xs-12" />
                    <List>
                        {posts}
                    </List>
                    <FlatButton label="Load more" style={{width: "100%", padding: 8}} onClick={this.loadMorePosts} />
                </div>
            </div>
        );
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
