export default function (state = false, action) {
    switch (action.type) {
    case 'redux-form/FOCUS':
        return true;

    case 'redux-form/BLUR':
        return false;

    default:
        return state;
    }
}
