export default function (state = false, action) {
    switch (action.type) {
    case "LEFTNAV_TOGGLE":
        return !state;

    case "@@router/UPDATE_PATH":
        return false;

    default:
        return state;
    }
}
