import React from "react"

import {
  Card,
  CardText,
  CardHeader
} from "material-ui"

import PostForm from "components/post-form"

export default function(props) {
  const postCards = props.posts.map(post =>
    <Card key={i} style={{marginTop: 32}}>
      <CardHeader title="Title" />
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum
      </CardText>
    </Card>
  )

  return (
    <div {...props}>
      <img style={{width: "100%"}} src="" />
      <div className="container-fluid">
        <div className="col-md-10 col-md-offset-1 col-xs-12">
          <PostForm className="col-xs-12" />
          {postCards}
        </div>
      </div>
    </div>
  );
}
