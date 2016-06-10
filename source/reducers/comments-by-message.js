import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    let comments;

    switch (action.type) {
    case 'MESSAGES_ADD':
        comments = state.get(action.data.id) || Immutable.Map({});
        return state.set(action.data.id, comments);

    case 'MESSAGES_REMOVE':
        return state.delete(action.data.id);

    case 'COMMENTS_ADD':
        comments = state.get(action.data.message_id) || Immutable.Map({});
        return state.set(action.data.message_id, comments.set(action.data.id, action.data));

    case 'COMMENTS_REMOVE':
        comments = state.get(action.data.message_id) || Immutable.Map({});
        return state.set(action.data.message_id, comments.delete(action.data.id));

    default:
        return state;
    }
}
