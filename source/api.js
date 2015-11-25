import { baseUrl } from "config"
import store from "store"

function headers() {
  let base = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const { tokens, currentToken } = store.getState()
  if (tokens.get(currentToken)) {
    base['Authorization'] = 'Bearer ' + tokens.get(currentToken).access_token
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
          resolve(data)
        })
        .catch((error) => {
          if (error.response) {
            let authError = error.response.headers.get('www-authenticate')
            if (authError && authError.match("error=\"invalid_grant\"")) {
              reject({_error: "invalid_grant"})
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
    create: (params, dispatch) => {
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
        .catch(reject)
      })
    },

    find: (query, dispatch) => {
      return new Promise((resolve, reject) => {
        find("/users", query)
        .then((data) => {
          dispatch({
            type: "ADD_USER",
            data: data
          })
          resolve(data)
        })
        .catch(reject)
      })
    },

    findMe: (query, dispatch) => {
      return new Promise((resolve, reject) => {
        find("/users/me", query)
        .then((data) => {
          dispatch({
            type: "ADD_USER",
            data: data
          })
          resolve(data)
        })
        .catch(reject)
      })
    }
  }
}
