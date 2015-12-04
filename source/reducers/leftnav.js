export default function(state = false, action) {
  switch (action.type) {
    case "TOGGLE_LEFTNAV":
      return !state
    default:
      return state
  }
}
