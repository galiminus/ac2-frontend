import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routeReducer } from 'redux-simple-router'

import tokens from "reducers/tokens"
import users from "reducers/users"
import currentUser from "reducers/current-user"
import currentToken from "reducers/current-token"

let reducers = combineReducers({
    tokens,
    currentToken,
    users,
    currentUser,
    form,
    routing: routeReducer
  }
)

export default reducers
