import React from "react"
import { connect } from 'react-redux'

import {
  List,
  ListItem
} from "material-ui"

import PostForm from "components/post-form"

import store from "store"
import { posts } from "api"

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (query) => posts.find(query, store.dispatch)
  }
}

const Feed = React.createClass({
  componentWillMount() {
    this.props.loadPosts({})
  },

  render: function() {
    const postCards = this.props.posts.map(post =>
      <ListItem key={post.id} style={{marginTop: 32}} secondaryText={post.data.body} />
    )

    return (
      <div {...this.props}>
        <img style={{width: "100%"}} src="" />
        <div className="container-fluid">
          <div className="col-md-12 col-xs-12">
            <PostForm className="col-xs-12" />
            <List>
              {postCards}
            </List>
          </div>
        </div>
      </div>
    );
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
