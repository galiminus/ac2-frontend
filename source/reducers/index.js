import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form';

import currentUser from "./currentUser"

let reducers = combineReducers({
  currentUser,
  form
})

console.log({
  currentUser,
  form
})
export default reducers
