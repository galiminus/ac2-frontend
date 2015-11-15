import { createToken } from "api"

export default {
  createToken: (fields, dispatch) => {
    createToken(fields)
      .then((response) => {
        console.log("RESP", response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
