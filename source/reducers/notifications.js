export default function (state = { message: "" }, action) {
    const timestamp = new Date().getTime();

    switch (action.type) {
    case "NOTIFICATIONS_PUSH":
        return { ...action.data, timestamp };

    case "redux-form/STOP_SUBMIT":
        if (action.errors && action.errors._error) {
            return { message: action.errors._error, timestamp };
        }
        return state;

    default:
        return state;
    }
}
