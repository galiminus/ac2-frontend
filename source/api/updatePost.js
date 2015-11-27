import { update } from "api/http"

export default (record, dispatch) => {
  return new Promise((resolve, reject) => {
    update(`/posts/${record.id}`, {
      post: record
    })
    .then((data) => {
      dispatch({
        type: "ADD_POST",
        data: record
      })
      resolve(record)
    })
    .catch((error) => {
      error.response.json().then((response) => {
        reject({_error: "unknown"})
      })
    })
  })
}
