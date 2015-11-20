import { createStore, applyMiddleware, compose } from 'redux'
import reducer from "reducers"
import thunk from 'redux-thunk'
import { devTools } from 'redux-devtools'

let createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  devTools()
)(createStore)

export default createStoreWithMiddleware(reducer)
