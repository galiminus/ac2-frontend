import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'MESSAGES_ADD':
        return state.set(action.data.id, action.data);

    case 'MESSAGES_REMOVE':
        return state.delete(action.data.id);

    case 'MESSAGES_CLEAR':
        return state.clear();

    default:
        return state;
    }
}
