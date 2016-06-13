import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    let comments;

    switch (action.type) {
    case 'MESSAGE_ADD':
        comments = state.get(action.data.id) || Immutable.Map({});
        return state.set(action.data.id, comments);

    case 'MESSAGE_REMOVE':
        return state.delete(action.data.id);

    case 'COMMENT_ADD':
        comments = state.get(action.data.message_id) || Immutable.Map({});
        return state.set(action.data.message_id, comments.set(action.data.id, action.data));

    case 'COMMENT_REMOVE':
        comments = state.get(action.data.message_id) || Immutable.Map({});
        return state.set(action.data.message_id, comments.delete(action.data.id));

    default:
        return state;
    }
}
