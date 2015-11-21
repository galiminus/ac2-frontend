import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from "immutable"
import rootReducer from "reducers"
import thunk from 'redux-thunk'
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage/adapter';
import filter from 'redux-localstorage-filter';

const reducer = compose(
  mergePersistedState((state, persistedState) => {
    state.tokens = Immutable.fromJS(persistedState.tokens)
    state.currentUser = persistedState.currentUser
    return state
  })
)(rootReducer);

const storage = compose(
  filter(["tokens", "currentUser"])
)(adapter(window.localStorage));

let createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
)(createStore)

const createPersistentStore = compose(
  persistState(storage, 'state')
)(createStoreWithMiddleware);

export default createPersistentStore(reducer)
