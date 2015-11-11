import Immutable from 'immutable'

export default function currentUser(state = Immutable.Map(), action) {
  switch (action.type) {
    case "CHANGE_NAME":
      return state.merge({name: action.name})
    default:
      return state
  }
}
