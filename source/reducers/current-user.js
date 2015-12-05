import Immutable from "immutable"

export default function(state = null, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return state = String(action.id)
    case "REMOVE_ALL_TOKENS":
      return null
    default:
      return state
  }
}
