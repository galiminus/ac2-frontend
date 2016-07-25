export default function (state = null, action) {
    switch (action.type) {
    case 'CURRENT_USER_SET':
        return action.id;

    case 'TOKEN_CLEAR':
        return null;

    default:
        return state;
    }
}
