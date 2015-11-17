import { createStore, applyMiddleware, compose } from 'redux'
import reducer from "reducers/index"
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import { devTools } from 'redux-devtools'

let createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState()
)(createStore)

export default createStoreWithMiddleware(reducer)

// persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
