import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'GROUP_ADD':
        return state.set(action.data.id, action.data);

    case 'GROUP_REMOVE':
        return state.delete(action.data.id);

    case 'GROUP_CLEAR':
        return state.clear();

    default:
        return state;
    }
}
