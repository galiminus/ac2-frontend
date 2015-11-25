import Immutable from "immutable"

export default function(state = Immutable.Map({}), action) {
  switch (action.type) {
    case "ADD_TOKEN":
      return state.set(action.data.access_token, action.data)
    default:
      return state
  }
}
