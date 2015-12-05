import Immutable from "immutable"

export default function(state = Immutable.Map({}), action) {
  switch (action.type) {
    case "ADD_USER":
      return state.set(String(action.data.id), action.data)
    case "REMOVE_ALL_TOKENS":
      return Immutable.Map({})
    default:
      return state
  }
}
