import { create } from "api/http"

export default (params, dispatch) => {
  return new Promise((resolve, reject) => {
    create("/users", {
      user: params
    })
    .then((data) => {
      dispatch({
        type: "ADD_USER",
        data: data
      })
      resolve(data)
    })
    .catch((error) => {
      error.response.json().then((response) => {
        if (response.email == "has already been taken") {
          reject({_error: "email_already_in_use"})
        }
        else {
          reject({_error: "unknown"})
        }
      })
    })
  })
}
