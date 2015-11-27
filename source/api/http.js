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

export default {
  create: (path, record) => {
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
  },

  update: (path, record) => {
    return fetch(`${baseUrl}${path}`, {
      method: "PUT",
      body: JSON.stringify(record),
      mode: 'cors',
      headers: {
        ...headers()
      }
    })
    .then(handleError)
    .then(handleJSON)
  }

  find: (path, query) => {
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
}
