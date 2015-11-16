import { createStore, applyMiddleware, compose } from 'redux'
import reducer from "reducers/index"
import thunk from 'redux-thunk'
import { devTools, persistState } from 'redux-devtools'

let createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)

export default createStoreWithMiddleware(reducer)
