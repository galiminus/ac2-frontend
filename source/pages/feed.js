import React from "react"
import { connect } from 'react-redux'

import {
  List,
  ListItem
} from "material-ui"

import { FormattedMessage } from "react-intl"

import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

import PostForm from "components/post-form"

import store from "store"
import { posts, pages } from "api"

function mapStateToProps(state, props) {
  return {
    posts: state.posts,
    page: state.pages.get(props.params.pageId)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPosts: (query) => posts.find(query, dispatch),
    getPage: (id, query) => pages.get(id, query, dispatch)
  }
}

const Feed = React.createClass({
  componentWillMount() {
    const { params, loadPosts, getPage } = this.props
    let query = {}

    if (params.pageId) {
      getPage(params.pageId)

      query.page = params.pageId
    }
    loadPosts(query)
  },

  getStyles() {
    let bannerImage;
    if (this.props.params.pageId) {
      bannerImage = "http://d.facdn.net/art/phorque/1397922715/1397922715.phorque_p51mustang_mini.jpg"
    }
    else {
      bannerImage = "http://www.hdwallpaperscool.com/wp-content/uploads/2014/10/harp-seal-desktop-wallpaper-in-high-resolution-wide-free.jpg"
    }
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
        position: "absolute",
        bottom: 0,
        color: DefaultRawTheme.palette.alternateTextColor
      }
    }
  },

  render: function() {
    const style = this.getStyles()

    let infos;
    if (this.props.page) {
      switch (this.props.page.owner_type) {
        case "User":
          infos = <h1>{this.props.page.owner.profile.name}</h1>
          break;
        default:

      }
    }
    else if (!this.props.params.pageId) {
      infos = <h1><FormattedMessage id="links.mainFeed" /></h1>
    }

    let infosContainer = "";
    if (infos) {
      infosContainer =
        <aside style={style.infos}>
          <div style={{padding: "16px 32px"}}>{infos}</div>
        </aside>
    }

    const postCards = this.props.posts.map(post =>
      <ListItem key={post.id} style={{marginTop: 32}} secondaryText={post.data.body} />
    )

    return (
      <div {...this.props}>
        <div style={style.banner}>
          {infosContainer}
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
