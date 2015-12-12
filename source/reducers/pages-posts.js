import Immutable from "immutable"

export default function(state = Immutable.Map({}), action) {
    switch (action.type) {
        case "PAGES_POSTS_CLEAR":
        return state.set(action.data.id, [])

        case "PAGES_POSTS_PUSH":
        return state.set(action.data.id, [...(state.get(action.data.id) || []), ...action.data.postIds])

        default:
        return state
    }
}
