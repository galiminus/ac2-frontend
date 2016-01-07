import Immutable from "immutable";

export default function (state = Immutable.OrderedMap({}), action) {
    switch (action.type) {
    case "POSTS_ADD":
        return state.set(action.data.id, action.data.attributes);

    case "POSTS_CLEAR":
        return state.clear();

    default:
        return state;
    }
}
