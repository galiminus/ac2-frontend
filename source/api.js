import createToken from "api/createToken"
import createUser from "api/createUser"
import findUser from "api/findUsers"
import findMe from "api/findMe"

export default {
  tokens: {
    create: createToken
  },

  users: {
    create: createUser,
    find: findUsers,
    findMe: findMe
  }
}
