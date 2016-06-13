import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'LIKE_ADD':
        return state.set(action.data.id, action.data);

    case 'LIKE_REMOVE':
        return state.delete(action.data.id);

    default:
        return state;
    }
}
