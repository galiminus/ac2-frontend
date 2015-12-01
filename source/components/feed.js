import React from "react"

import {
  Card,
  CardText,
  CardHeader
} from "material-ui"

import PostForm from "components/post-form"

export default function(props) {
  const postCards = props.posts.map(post =>
    <Card key={post.id} style={{marginTop: 32}}>
      <CardHeader title="Title" />
      <CardText>
        {post.data.body}
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
