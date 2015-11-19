import { baseUrl } from "config"

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

function handleError(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  else {
    let error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function create(path, record) {
  return fetch(`${baseUrl}/${path}`, {
    method: "POST",
    body: JSON.stringify(record),
    headers: {
      ...headers
    }
  })
  .then(handleError)
}


export default {
  tokens: {
    create: (params, dispatch) => {
      return new Promise((resolve, reject) => {
        create("/oauth/token", {
          username: params.email,
          password: params.password,
          grant_type: "password"
        })
        .then((response) => {
          dispatch({
            type: "ADD_TOKEN",
            data: response
          })
          resolve()
        })
        .catch((error) => {
          let authError = error.response.headers.get('www-authenticate')
          if (authError && authError.match("error=\"invalid_grant\"")) {
            reject({password: "invalid_grant", _error: "invalid_grant"})
          }
        })
      })
    }
  }
}
