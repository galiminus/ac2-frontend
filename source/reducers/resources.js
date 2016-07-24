import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'RESOURCE_ADD':
        return state.withMutations((tmp) => {
            tmp.set(action.data.id, action.data).set(action.data.slug, action.data);
        });

    case 'RESOURCE_REMOVE':
        return state.withMutations((tmp) => {
            tmp.delete(action.data.id).delete(action.data.slug);
        });

    default:
        return state;
    }
}
