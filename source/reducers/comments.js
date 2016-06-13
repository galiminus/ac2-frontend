import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'COMMENT_ADD':
        return state.set(action.data.id, action.data);

    case 'COMMENT_REMOVE':
        return state.delete(action.data.id);

    default:
        return state;
    }
}
