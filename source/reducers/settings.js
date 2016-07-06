export default function (state = {}, action) {
    switch (action.type) {
    case 'SETTING_ADD':
        return action.data;

    default:
        return state;
    }
}
