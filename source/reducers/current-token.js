import Immutable from "immutable"

export default function(state = null, action) {
  switch (action.type) {
    case "SET_CURRENT_TOKEN":
      return action.access_token
    case "REMOVE_ALL_TOKENS":
      return null
    default:
      return state
  }
}
