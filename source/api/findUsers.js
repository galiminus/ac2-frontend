import { find } from "api/http"

export default function(query, dispatch) {
  return new Promise((resolve, reject) => {
    find("/users", query)
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
