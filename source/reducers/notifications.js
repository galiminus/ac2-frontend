export default function (state = { message: '' }, action) {
    switch (action.type) {
    case 'NOTIFICATION_PUSH':
        return action.data;

    case 'NOTIFICATIONS_CLEAR':
        return ({ message: '' });

    default:
        return state;
    }
}
