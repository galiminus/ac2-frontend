import { baseUrl } from "config"
import store from "store"

function headers() {
  let base = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  if (store.getState().tokens.get(0)) {
    base['Authorization'] = 'Bearer ' + store.getState().tokens.get(0).access_token
  }

  return (base)
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

function handleJSON(response) {
  return response.json()
}

function create(path, record) {
  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    body: JSON.stringify(record),
    mode: 'cors',
    headers: {
      ...headers()
    }
  })
  .then(handleError)
  .then(handleJSON)
}

function find(path, query) {
  return fetch(`${baseUrl}${path}`, {
    method: "GET",
    mode: 'cors',
    headers: {
      ...headers()
    }
  })
  .then(handleError)
  .then(handleJSON)
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
        .then((data) => {
          dispatch({
            type: "ADD_TOKEN",
            data: data
          })
          resolve()
        })
        .catch((error) => {
          if (error.response) {
            let authError = error.response.headers.get('www-authenticate')
            if (authError && authError.match("error=\"invalid_grant\"")) {
              reject({password: "invalid_grant", _error: "invalid_grant"})
            }
          }
          else {
            reject(error)
          }
        })
      })
    }
  },

  users: {
    find: (query, dispatch) => {
      return new Promise((resolve, reject) => {
        find("/users", query)
        .then((data) => {
          dispatch({
            type: "ADD_USER",
            data: data
          })
        })
        .catch(reject)
      })
    },

    findMe: (query, dispatch) => {
      return new Promise((resolve, reject) => {
        find("/users/me", query)
        .then((data) => {
          dispatch({
            type: "SET_ME",
            data: data
          })
        })
        .catch(reject)
      })
    }
  }
}
