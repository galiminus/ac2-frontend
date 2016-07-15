import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'RELATIONSHIP_ADD':
        return state.set(action.data.id, action.data);

    case 'RELATIONSHIP_REMOVE':
        return state.delete(action.data.id);

    case 'RELATIONSHIP_CLEAR':
        return state.clear();

    default:
        return state;
    }
}
