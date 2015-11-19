import Immutable from "immutable"

export default function(state = Immutable.List.of(), action) {
  switch (action.type) {
    case "ADD_TOKEN":
      return state.push(action.data)
    default:
      return state
  }
}
