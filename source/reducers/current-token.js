import Immutable from "immutable"

export default function(state = null, action) {
  switch (action.type) {
    case "SET_CURRENT_TOKEN":
      return state = action.access_token
    default:
      return state
  }
}
