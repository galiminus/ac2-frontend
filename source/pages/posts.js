import React from "react"
import { connect } from 'react-redux'

import {
  List
} from "material-ui"

import PostForm from "components/post-form"

import { posts } from "api"
import { Post } from "components"

function mapStateToProps(state, props) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    findPosts: (query) => posts.find(query)
  }
}

const Posts = React.createClass({
  componentDidMount() {
    this.loadPosts(this.props.params.pageId)
  },

  componentWillReceiveProps(newProps) {
    if (this.props.params.pageId != newProps.params.pageId) {
      this.loadPosts(newProps.params.pageId)
    }
  },

  loadPosts(pageId) {
    let query = { include: "sender,recipient" }

    if (pageId) {
      query.page = pageId
    }
    this.props.findPosts(query)
  },

  render: function() {
    const posts = this.props.posts.map(post => <Post key={post.id} post={post} />)
    return (
        <div>
            <PostForm className="col-xs-12" />
            <List>
              {posts}
            </List>
        </div>
    );
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
