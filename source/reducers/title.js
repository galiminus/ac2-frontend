export default function (state = '', action) {
    switch (action.type) {
    case 'TITLE_SET':
        return action.data.title;

    default:
        return state;
    }
}
