import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    let comments;

    switch (action.type) {
    case 'POSTS_ADD':
        comments = state.get(action.data.id) || Immutable.Map({});
        return state.set(action.data.id, comments);

    case 'POSTS_REMOVE':
        return state.delete(action.data.id);

    case 'COMMENTS_ADD':
        comments = state.get(action.data.post_id) || Immutable.Map({});
        return state.set(action.data.post_id, comments.set(action.data.id, action.data));

    case 'COMMENTS_REMOVE':
        comments = state.get(action.data.post_id) || Immutable.Map({});
        return state.set(action.data.post_id, comments.delete(action.data.id));

    default:
        return state;
    }
}
