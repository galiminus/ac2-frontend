import React from "react"
import { connect } from 'react-redux'

import {
  List,
  ListItem,
  Paper,
  Toolbar,
  ToolbarGroup,
  ToolbarTitle
} from "material-ui"

import PostForm from "components/post-form"

import store from "store"
import { posts, pages } from "api"
import { UserAvatar, InfoBanner } from "components"

function mapStateToProps(state, props) {
  return {
    posts: state.posts,
    page: state.pages.get(props.params.pageId)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    findPosts: (query) => posts.find(query, dispatch),
    getPage: (id, query) => pages.get(id, query, dispatch)
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

    let query = {}

    if (params.pageId) {
      getPage(params.pageId)

      query.page = params.pageId
    }
    findPosts(query)
  },

  renderPost(post) {
    let ownerInfos;
    switch (post.owner_type) {
      case "User":
        ownerInfos =
          <div>
            <UserAvatar user={post.owner} />
            <ToolbarTitle text={post.owner.profile.name} />
          </div>
        break;
    }

    return (
      <Paper style={{marginTop: 24}}>
        <Toolbar>
          <ToolbarGroup key={1} float="left">
            {ownerInfos}
          </ToolbarGroup>
        </Toolbar>
        <div style={{padding: 24}}>
          {post.data.body}
        </div>
      </Paper>
    )
  },

  render: function() {
    const posts = this.props.posts.map(post => this.renderPost(post))
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
