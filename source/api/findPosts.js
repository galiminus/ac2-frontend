import { find } from "api/http"

export default function(query, dispatch) {
  return new Promise((resolve, reject) => {
    find("/posts", query)
    .then((data) => {
      for (let post of data) {
        dispatch({
          type: "ADD_POST",
          data: post
        })
      }
      resolve(data)
    })
    .catch(reject)
  })
}
