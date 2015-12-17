import { createStore, applyMiddleware, compose } from 'redux'
import Immutable from "immutable"
import rootReducer from "reducers"
import thunk from 'redux-thunk'
import persistState, {mergePersistedState} from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage/adapter';
import filter from 'redux-localstorage-filter';
import createLogger from 'redux-logger';

const reducer = compose(
    mergePersistedState((state, persistedState) => {
        state.tokens = Immutable.Map(persistedState.tokens)
        state.currentToken = persistedState.currentToken

        state.users = Immutable.Map(persistedState.users)
        state.currentUser = persistedState.currentUser

        state.pages = Immutable.Map(persistedState.pages)
        state.posts = Immutable.Map(persistedState.posts)

        state.form = persistedState.form

        return state
    })
)(rootReducer);

const storage = compose(
    filter(["tokens", "currentUser", "users", "currentToken", "pages", "posts", "form"])
)(adapter(window.localStorage));

const logger = createLogger();

let createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
)(createStore)

const createPersistentStore = compose(
    persistState(storage, 'state')
)(createStoreWithMiddleware);

export default createPersistentStore(reducer)
