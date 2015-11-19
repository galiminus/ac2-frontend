import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routeReducer } from 'redux-simple-router'

import tokens from "reducers/tokens"

let reducers = combineReducers({
    tokens,
    form,
    routing: routeReducer
  }
)

export default reducers
