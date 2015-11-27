import { find } from "api/http"

export default function(query, dispatch) {
  return new Promise((resolve, reject) => {
    find("/posts", query)
    .then((data) => {
      dispatch({
        type: "ADD_POST",
        data: data
      })
      resolve(data)
    })
    .catch(reject)
  })
}
