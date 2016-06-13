import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'USER_ADD':
        return state.set(action.data.id, action.data);

    case 'TOKENS_CLEAR':
        return Immutable.Map({});

    default:
        return state;
    }
}
