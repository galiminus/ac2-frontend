import React from "react"
import { connect } from 'react-redux'

import {
  List,
  ListItem
} from "material-ui"

import PostForm from "components/post-form"

import store from "store"
import { posts, pages } from "api"
import { InfoBanner, Post } from "components"

function mapStateToProps(state, props) {
  return {
    posts: state.posts,
    page: state.pages.get(props.params.pageId)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    findPosts: (query) => posts.find(query),
    getPage: (id, query) => pages.get(id, query)
  }
}

const Page = React.createClass({
  componentDidMount() {
    this.loadPosts()
  },

  componentWillReceiveProps(newProps) {
    if (this.props.params.pageId != newProps.params.pageId) {
      this.loadPosts()
    }
  },

  loadPosts() {
    const { params, findPosts, getPage } = this.props

    let query = { include: "sender,recipient" }

    if (params.pageId) {
      getPage(params.pageId, { include: "owner" })

      query.page = params.pageId
    }
    findPosts(query)
  },

  render: function() {
    const posts = this.props.posts.map(post => <Post key={post.id} post={post} />)
    return (
      <div style={{perspective: 1, transformStyle: "preserve-3d", overflowX: "hidden", overflowY: "scroll", "height": "100vh"}}>
        <InfoBanner page={this.props.page || { owner_type: "Main" }} />
        <div className="container-fluid" style={{zIndex: 2, background: "white", height: "100%"}}>
          <div className="col-md-8 col-sm-8 col-xs-12">
            <PostForm className="col-xs-12" />
            <List>
              {posts}
            </List>
          </div>
        </div>
      </div>
    );
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
