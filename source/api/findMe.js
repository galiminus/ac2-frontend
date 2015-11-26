import { find } from "api/http"

export default (query, dispatch) => {
  return new Promise((resolve, reject) => {
    find("/users/me", query)
    .then((data) => {
      dispatch({
        type: "ADD_USER",
        data: data
      })
      resolve(data)
    })
    .catch(reject)
  })
}
