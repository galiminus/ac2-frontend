export default {
  clear: (id) => ({ type: "PAGES_POSTS_CLEAR", data: { id } }),
  push: (id, postIds) => ({ type: "PAGES_POSTS_PUSH", data: { id, postIds }})
}
