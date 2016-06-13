import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'MESSAGE_ADD':
        return state.set(action.data.id, action.data);

    case 'MESSAGE_REMOVE':
        return state.delete(action.data.id);

    case 'MESSAGE_CLEAR':
        return state.clear();

    default:
        return state;
    }
}
