export default function (state = { message: '' }, action) {
    switch (action.type) {
    case 'NOTIFICATIONS_PUSH':
        return action.data;

    default:
        return state;
    }
}
