import Immutable from 'immutable';

const resourcesReducerFactory = (type) => (state = Immutable.Map({}), action) => {
    switch (action.type) {
    case `${type}_ADD`:
        return state.withMutations((tmp) => {
            tmp.set(action.data.id, action.data).set(action.data.slug, action.data);
        });

    case `${type}_REMOVE`:
        return state.withMutations((tmp) => {
            tmp.delete(action.data.id).delete(action.data.slug);
        });

    case `${type}_CLEAR`:
        return state.clear();

    default:
        return state;
    }
};

export default resourcesReducerFactory;
