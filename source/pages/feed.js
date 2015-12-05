import React from "react"
import { connect } from 'react-redux'

import {
  List,
  ListItem
} from "material-ui"

import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

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
    let query = {}

    if (this.props.params.pageId) {
      query.page = this.props.params.pageId
    }
    this.props.loadPosts(query)
  },

  getStyles() {
    let bannerImage = "http://d.facdn.net/art/phorque/1397922715/1397922715.phorque_p51mustang_mini.jpg"

    return {
      banner: {
        width: "100%",
        background: `#000 url(${bannerImage}) no-repeat center/cover`,
        height: 0,
        paddingBottom: "30%",
        position: "relative"
      },
      infos: {
        fontFamily: DefaultRawTheme.fontFamily,
        width: "100%",
        background: DefaultRawTheme.palette.textColor,
        opacity: 0.8,
        padding: "16px 0",
        position: "absolute",
        bottom: 0,
        color: DefaultRawTheme.palette.alternateTextColor
      }
    }
  },

  render: function() {
    const style = this.getStyles()

    const postCards = this.props.posts.map(post =>
      <ListItem key={post.id} style={{marginTop: 32}} secondaryText={post.data.body} />
    )

    return (
      <div {...this.props}>
        <div style={style.banner}>
          <aside style={style.infos}>
            LOL
          </aside>
        </div>
        <div className="container-fluid">
          <div className="col-md-8 col-xs-12" style={{marginTop: 32}}>
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
