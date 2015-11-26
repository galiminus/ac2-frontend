import { create } from "api/http"

export default (params, dispatch) => {
  return new Promise((resolve, reject) => {
    create("/oauth/token", {
      username: params.email,
      password: params.password,
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
