import createToken from "api/createToken"
import createUser from "api/createUser"
import findUser from "api/findUser"
import findMe from "api/findMe"
console.log(createUser)

export default {
  tokens: {
    create: createToken
  },

  users: {
    create: createUser,
    find: findUser,
    findMe: findMe
  }
}
