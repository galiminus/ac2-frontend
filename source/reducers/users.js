import Immutable from "immutable"

export default function(state = Immutable.Map({}), action) {
  switch (action.type) {
    case "USERS_ADD":
      return state.set(String(action.data.id), action.data.attributes)
    case "TOKENS_CLEAR":
      return Immutable.Map({})
    default:
      return state
  }
}
