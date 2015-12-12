import { baseUrl } from "config"
import store from "store"
import queryString from "query-string"

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

function dispatchRecord(record) {
    record.attributes.id = record.id

    for (let name of Object.keys(record.relationships)) {
        if (record.relationships[name].data) {
            record.attributes[`${name}_id`] = record.relationships[name].data.id
        }
    }
    store.dispatch({
        type: `${record.type.toUpperCase()}_ADD`,
        data: record
    })
}

function handleJSONAPI(response) {
    if (Array.isArray(response.data)) {
        let ids = []

        for (let record of response.data) {
            dispatchRecord(record)
            ids.push(record.id)
        }

        return (ids)
    }
    else if (typeof(response.data) === 'object') {
        dispatchRecord(response.data)
        return (response.data.id)
    }
    else {
        return (response)
    }

    if (response.included) {
        for (let record of response.included) {
            dispatchRecord(record)
        }
    }
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
    .then(handleJSONAPI)
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
    .then(handleJSONAPI)
  },

  find: (path, query) => {
    return fetch(`${baseUrl}${path}?${queryString.stringify(query)}`, {
      method: "GET",
      mode: 'cors',
      headers: {
        ...headers()
      }
    })
    .then(handleError)
    .then(handleJSON)
    .then(handleJSONAPI)
  }
}
