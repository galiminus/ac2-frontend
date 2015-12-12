import Immutable from "immutable"

export default function(state = null, action) {
  switch (action.type) {
    case "CURRENT_TOKEN_SET":
      return action.access_token
    case "TOKENS_CLEAR":
      return null
    default:
      return state
  }
}
