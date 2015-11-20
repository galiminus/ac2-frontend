import Immutable from "immutable"

export default function(state = null, action) {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return state = action.id
    default:
      return state
  }
}
