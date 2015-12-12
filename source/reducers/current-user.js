import Immutable from "immutable"

export default function(state = null, action) {
  switch (action.type) {
    case "CURRENT_USER_SET":
      return state = String(action.id)
    case "TOKENS_CLEAR":
      return null
    default:
      return state
  }
}
