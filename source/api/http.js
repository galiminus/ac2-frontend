import queryString from "query-string"

import { baseUrl } from "config"
import store from "store"
import { tokens } from "action-creators"


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

function handleDisconnect(response) {
    if (response.status == 401) {
        let unauthorizedError = response.headers.get('www-authenticate')
        if (unauthorizedError && unauthorizedError.match("error=\"invalid_token\"")) {
            store.dispatch(tokens.removeAll())
        }
    }
    return response
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
    record.attributes = { ...(record.attributes || {}), id: record.id, type: record.type }

    for (let name of Object.keys(record.relationships)) {
        if (record.relationships[name].data) {
            record.attributes[`${name}_id`] = record.relationships[name].data.id
            record.attributes[`${name}_type`] = record.relationships[name].data.type
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
        if (response.included) {
            for (let record of response.included) {
                dispatchRecord(record)
            }
        }

        return (ids)
    }
    else if (typeof(response.data) === 'object') {
        dispatchRecord(response.data)
        if (response.included) {
            for (let record of response.included) {
                dispatchRecord(record)
            }
        }

        return (response.data.id)
    }
    else {
        return (response)
    }
}

export default {
  create: (path, record, query) => {
    return fetch(`${baseUrl}${path}?${queryString.stringify(query)}`, {
      method: "POST",
      body: JSON.stringify(record),
      mode: 'cors',
      headers: {
        ...headers()
      }
    })
    .then(handleDisconnect)
    .then(handleError)
    .then(handleJSON)
    .then(handleJSONAPI)
  },

  update: (path, record, query) => {
    return fetch(`${baseUrl}${path}?${queryString.stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(record),
      mode: 'cors',
      headers: {
        ...headers()
      }
    })
    .then(handleDisconnect)
    .then(handleError)
  },

  find: (path, query) => {
    return fetch(`${baseUrl}${path}?${queryString.stringify(query)}`, {
      method: "GET",
      mode: 'cors',
      headers: {
        ...headers()
      }
    })
    .then(handleDisconnect)
    .then(handleError)
    .then(handleJSON)
    .then(handleJSONAPI)
  }
}
