import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routeReducer } from 'redux-simple-router'

import users from "reducers/users"
import currentUser from "reducers/current-user"

import tokens from "reducers/tokens"
import currentToken from "reducers/current-token"

import posts from "reducers/posts"

let reducers = combineReducers({
    tokens,
    currentToken,
    users,
    currentUser,
    posts,
    form,
    routing: routeReducer
  }
)

export default reducers
