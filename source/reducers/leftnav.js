export default function (state = false, action) {
    switch (action.type) {
    case "LEFTNAV_TOGGLE":
        return !state;

    default:
        return state;
    }
}
