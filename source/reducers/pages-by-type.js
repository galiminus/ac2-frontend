import Immutable from 'immutable';
import { extractTypes } from 'utils/types';

export default function (state = Immutable.Map({}), action) {
    let pages;
    let newState;

    switch (action.type) {
    case 'PAGE_ADD':
        for (const type of extractTypes(action.data.type)) {
            pages = state.get(type) || Immutable.Map({});
            pages = pages.set(action.data.id, action.data);

            newState = state.set(type, pages);
        }
        return newState;

    case 'PAGE_REMOVE':
        for (const type of extractTypes(action.data.type)) {
            pages = state.get(type) || Immutable.Map({});
            pages = pages.delete(action.data.id);

            newState = state.set(type, pages);
        }
        return newState;

    default:
        return state;
    }
}
