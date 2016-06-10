import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    let posts;
    let newState;

    switch (action.type) {
    case 'PAGES_ADD':
        posts = state.get(action.data.id) || Immutable.Map({});
        return state.set(action.data.id, posts);

    case 'PAGES_REMOVE':
        return state.delete(action.data.id);

    case 'POSTS_ADD':
        posts = state.get(action.data.sender_id) || Immutable.Map({});
        newState = state.set(action.data.sender_id, posts.set(action.data.id, action.data));

        if (action.data.recipient_id) {
            posts = newState.get(action.data.recipient_id) || Immutable.Map({});
            newState = newState.set(action.data.recipient_id, posts.set(action.data.id, action.data));
        }

        return (newState);

    case 'POSTS_REMOVE':
        posts = state.get(action.data.sender_id) || Immutable.Map({});
        newState = state.set(action.data.sender_id, posts.delete(action.data.id));

        if (action.data.recipient_id) {
            posts = newState.get(action.data.recipient_id) || Immutable.Map({});
            newState = newState.set(action.data.recipient_id, posts.delete(action.data.id));
        }

        return (newState);

    default:
        return state;
    }
}
