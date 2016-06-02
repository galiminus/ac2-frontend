import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'COMMENTS_ADD':
        return state.set(action.data.id, action.data.attributes);

    case 'RESOURCE_REMOVE':
        return state.delete(action.data.id);

    default:
        return state;
    }
}
