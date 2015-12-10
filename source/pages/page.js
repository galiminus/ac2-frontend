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

import { FormattedMessage } from "react-intl"

import DefaultRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';

import PostForm from "components/post-form"

import store from "store"
import { posts, pages } from "api"
import { UserAvatar } from "components"

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
        minHeight: "40vw",
      },
      bannerBefore: {
        background: "center / cover",
        backgroundImage: `url(${bannerImage})`,
        position: "relative",
        transformOrigin: "center center 0",
        transform: "translateZ(-1px) scale(2)",
        zIndex: -1,
        minHeight: "100vh",
        marginTop: "-20vw"
      },
      infos: {
        fontFamily: DefaultRawTheme.fontFamily,
        width: "100%",
        background: DefaultRawTheme.palette.textColor,
        opacity: 0.8,
        position: "absolute",
        bottom: 0,
        zIndex: 1,
        color: DefaultRawTheme.palette.alternateTextColor
      }
    }
  },

  renderInfoBanner: function() {
    const style = this.getStyles()

    let ownerInfos;
    if (this.props.page) {
      switch (this.props.page.owner_type) {
        case "User":
          ownerInfos = <h1>{this.props.page.owner.profile.name}</h1>
          break;
      }
    }
    else if (!this.props.params.pageId) {
      ownerInfos = <h1><FormattedMessage id="links.mainFeed" /></h1>
    }

    let ownerInfosContainer = "";
    if (ownerInfos) {
      ownerInfosContainer =
        <aside style={style.infos}>
          <div style={{padding: "16px 32px"}}>{ownerInfos}</div>
        </aside>
    }

    return (
      <div style={{position: "relative", maxHeight: "50vw"}}>
        <div style={style.bannerBefore}>
        </div>
        <div style={style.banner}>
        </div>
        {ownerInfosContainer}
      </div>
    )
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
        {this.renderInfoBanner()}
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
