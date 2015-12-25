import queryString from "query-string";

import { baseUrl } from "config";
import store from "store";
import { tokens, resources } from "action-creators";

function headers() {
    const base = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    const state = store.getState();
    if (state.tokens.get(state.currentToken)) {
        base.Authorization = "Bearer " + state.tokens.get(state.currentToken).access_token;
    }

    return (base);
}

function handleDisconnect(response) {
    if (response.status === 401) {
        const unauthorizedError = response.headers.get("www-authenticate");
        if (unauthorizedError && unauthorizedError.match("error=\"invalid_token\"")) {
            store.dispatch(tokens.clear());
        }
    }
    return response;
}

function handleError(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

function handleJSON(response) {
    return response.json();
}

function handleJSONAPI(response) {
    if (Array.isArray(response.data)) {
        for (const record of response.data) {
            store.dispatch(resources.add(record));
        }
        if (response.included) {
            for (const record of response.included) {
                store.dispatch(resources.add(record));
            }
        }
    } else if (typeof(response.data) === "object") {
        store.dispatch(resources.add(response.data));
        if (response.included) {
            for (const record of response.included) {
                store.dispatch(resources.add(record));
            }
        }
    }

    return (response);
}

function fetchJSON(path, params) {
    return fetch(path, params)
        .then(handleDisconnect)
        .then(handleError)
        .then(handleJSON)
        .then(handleJSONAPI)
        .catch((error) => {
            if (error.name === "TypeError") {
                setTimeout(() => fetchJSON(path, params), 5000);
            }
        });
}

export default {
    create: (path, record, query, optimistic = false) => {
        if (optimistic) {
            store.dispatch(resources.add(record.data, { commited: false, error: false }));
        }

        return fetchJSON(`${baseUrl}${path}?${queryString.stringify(query)}`, {
            method: "POST",
            body: JSON.stringify(record),
            mode: "cors",
            headers: {
                ...headers()
            }
        });
    },

    update: (path, record, query, optimistic = false) => {
        if (optimistic) {
            store.dispatch(resources.add(record.data, { commited: false, error: false }));
        }

        return fetchJSON(`${baseUrl}${path}?${queryString.stringify(query)}`, {
            method: "PUT",
            body: JSON.stringify(record),
            mode: "cors",
            headers: {
                ...headers()
            }
        });
    },

    find: (path, query) => {
        return fetchJSON(`${baseUrl}${path}?${queryString.stringify(query)}`, {
            method: "GET",
            mode: "cors",
            headers: {
                ...headers()
            }
        });
    }
};
