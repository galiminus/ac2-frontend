import createToken    from "api/createToken"
import createUser     from "api/createUser"
import findUsers      from "api/findUsers"
import findMe         from "api/findMe"
import createPost     from "api/createPost"
import findPosts      from "api/findPosts"
import updatePost     from "api/updatePost"

export default {
  tokens: {
    create: createToken
  },

  users: {
    create: createUser,
    find: findUsers,
    findMe: findMe
  },

  posts: {
    create: createPost,
    find: findPosts,
    updatePost: updatePost
  }
}
