import Immutable from "immutable";
import Polyglot from "node-polyglot";

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case "TRANSLATIONS_ADD":
        return state.set(action.data.language, new Polyglot({ phrases: action.data.translations }));

    default:
        return state;
    }
}
