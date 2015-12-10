import Immutable from "immutable"

export default function(state = Immutable.OrderedMap({}), action) {
  switch (action.type) {
    case "PAGES_ADD":
      return state.set(String(action.data.id), action.data.attributes)
    default:
      return state
  }
}
