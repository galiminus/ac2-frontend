import { createStore, applyMiddleware, compose } from 'redux'
import reducer from "reducers/index"
import thunk from 'redux-thunk'

let createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore)

export default createStoreWithMiddleware(reducer)
