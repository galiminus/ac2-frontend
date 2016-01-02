import Immutable from "immutable";

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case "PAGE_TYPES_ADD":
        return state.set(action.data.attributes.name, action.data.attributes);

    default:
        return state;
    }
}
