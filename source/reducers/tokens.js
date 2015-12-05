import Immutable from "immutable"

export default function(state = Immutable.Map({}), action) {
  switch (action.type) {
    case "ADD_TOKEN":
      return state.set(action.data.access_token, action.data)
    case "REMOVE_ALL_TOKENS":
      return Immutable.Map({})
    default:
      return state
  }
}
