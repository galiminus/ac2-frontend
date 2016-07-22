import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'SCHEMA_ADD':
        return state.set(action.data.model, action.data);

    case 'SCHEMA_REMOVE':
        return state.delete(action.data.model);

    default:
        return state;
    }
}
