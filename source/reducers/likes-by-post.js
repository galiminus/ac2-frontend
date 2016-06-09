import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    let likes;

    switch (action.type) {
    case 'POSTS_ADD':
        likes = state.get(action.data.id) || Immutable.Map({});
        return state.set(action.data.id, likes);

    case 'POSTS_REMOVE':
        return state.delete(action.data.id);

    case 'LIKES_ADD':
        if (action.data.liked_type === 'posts') {
            likes = state.get(action.data.liked_id) || Immutable.Map({});
            return (state.set(action.data.liked_id, likes.set(action.data.id, action.data)));
        }
        return (state);

    case 'LIKES_REMOVE':
        if (action.data.liked_type === 'posts') {
            likes = state.get(action.data.liked_id) || Immutable.Map({});
            return (state.set(action.data.liked_id, likes.delete(action.data.id)));
        }
        return (state);

    default:
        return state;
    }
}
