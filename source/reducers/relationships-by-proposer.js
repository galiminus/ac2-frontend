import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    let relationships;

    switch (action.type) {
    case 'PAGE_ADD':
        relationships = state.get(action.data.id) || Immutable.Map({});
        return state.set(action.data.id, relationships);

    case 'PAGE_REMOVE':
        return state.delete(action.data.id);

    case 'RELATIONSHIP_ADD':
        relationships = state.get(action.data.proposer_id) || Immutable.Map({});
        return state.set(action.data.proposer_id, relationships.set(action.data.id, action.data));

    case 'RELATIONSHIP_REMOVE':
        relationships = state.get(action.data.proposer_id) || Immutable.Map({});
        return state.set(action.data.proposer_id, relationships.delete(action.data.id));

    default:
        return state;
    }
}
