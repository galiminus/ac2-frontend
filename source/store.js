import { createStore, applyMiddleware, compose } from 'redux';
import Immutable from 'immutable';
import rootReducer from 'reducers';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';

import persistState, { mergePersistedState } from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage/adapter';
import filter from 'redux-localstorage-filter';
import createLogger from 'redux-logger';

const reducer = compose(
    mergePersistedState((state, persistedState) => {
        state.tokens = Immutable.Map(persistedState.tokens);
        state.currentToken = persistedState.currentToken;

        state.users = Immutable.Map(persistedState.users);
        state.currentUser = persistedState.currentUser;

        return state;
    })
)(rootReducer);

const storage = compose(
    filter(['tokens', 'currentUser', 'users', 'currentToken', 'pages', 'posts'])
)(adapter(window.localStorage));

const logger = createLogger();

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
)(createStore);

const createPersistentStore = compose(
    persistState(storage, 'state')
)(createStoreWithMiddleware);

export default createPersistentStore(enableBatching(reducer));
