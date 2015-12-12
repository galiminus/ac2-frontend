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
  const postIds = state.pagesPosts.get(props.params.pageId) || []

  return {
    posts: state.posts.filter((post) => (postIds.indexOf(post.id) >= 0) )
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
      query.page = pageId
    }

    query.page = pageNum

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
        <div>
            <PostForm className="col-xs-12" />
            <List>
              {posts}
            </List>
            <FlatButton label="Load more" style={{width: "100%", padding: 8}} onClick={this.loadMorePosts} />
        </div>
    );
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
