import { combineReducers } from 'redux-immutablejs'
import {reducer as form} from 'redux-form';

import currentUser from "./currentUser"

export default combineReducers({
  currentUser,
  form
})
