import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'USER_PAGES_ADD':
    case 'STATIC_PAGES_ADD':
        return state.set(action.data.id, action.data.attributes);

    default:
        return state;
    }
}
