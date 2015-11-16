import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form'
import api from "api"

import currentUser from "./currentUser"

let reducers = combineReducers({
    currentUser,
    form,
    ...api.reducers,
  }
)

export default reducers
