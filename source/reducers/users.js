import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'USER_ADD':
        return state.set(action.data.id, action.data);

    case 'TOKEN_CLEAR':
        return state.clear();

    default:
        return state;
    }
}
