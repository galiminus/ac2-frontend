import { create } from "api/http"

export default (record, dispatch) => {
  return new Promise((resolve, reject) => {
    create("/posts", {
      post: record
    })
    .then((data) => {
      dispatch({
        type: "ADD_POST",
        data: data
      })
      resolve(data)
    })
    .catch((error) => {
      error.response.json().then((response) => {
        reject({_error: "unknown"})
      })
    })
  })
}
