import Immutable from "immutable"

export default function(state = Immutable.Map({}), action) {
    switch (action.type) {
        case "PAGES_ADD":
        return state.set(action.data.id, {
            ...action.data.attributes, posts: []
        })
        default:
        return state
    }
}
