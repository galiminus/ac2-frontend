export default function(state = [], action) {
  console.log(state, action)
  switch (action.type) {
    case "ADD_TOKEN":
      return state.merge({name: action.name})
    default:
      return state
  }
}
