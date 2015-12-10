import { create } from "api/http"

export default (record, dispatch) => {
  return new Promise((resolve, reject) => {
    create("/posts", {
      post: record
    })
    .then(resolve)
    .catch((error) => {
      error.response.json().then((response) => {
        reject({_error: "unknown"})
      })
    })
  })
}
