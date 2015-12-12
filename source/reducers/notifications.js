import Immutable from "immutable"

export default function(state = "", action) {
    const timestamp = new Date().getTime()

    switch (action.type) {
        case "NOTIFICATIONS_PUSH":
        return {...action.data, timestamp }

        case "redux-form/STOP_SUBMIT":
        if (action.errors._error) {
            return { message: action.errors._error, timestamp }
        }
        else {
            return state
        }

        default:
        return state
    }
}
