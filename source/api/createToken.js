import { create } from "api/http"

export default (record, dispatch) => {
  return new Promise((resolve, reject) => {
    create("/oauth/token", {
      username: record.email,
      password: record.password,
      grant_type: "password"
    })
    .then((data) => {
      dispatch({
        type: "ADD_TOKEN",
        data: data
      })
      resolve(data)
    })
    .catch((error) => {
      let authError = error.response.headers.get('www-authenticate')
      if (authError && authError.match("error=\"invalid_grant\"")) {
        reject({_error: "invalid_grant"})
      }
    })
  })
}
