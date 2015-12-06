import createToken    from "api/createToken"
import createUser     from "api/createUser"
import findUsers      from "api/findUsers"
import getMe          from "api/getMe"
import createPost     from "api/createPost"
import findPosts      from "api/findPosts"
import updatePost     from "api/updatePost"
import getPage        from "api/getPage"

export default {
  tokens: {
    create: createToken
  },

  users: {
    create: createUser,
    find: findUsers,
    getMe: getMe
  },

  posts: {
    create: createPost,
    find: findPosts,
    updatePost: updatePost
  },

  pages: {
    get: getPage
  }
}
