export default function (state = 'fr-FR', action) {
    switch (action.type) {
    case 'CURRENT_LOCALE_SET':
        return action.language;

    default:
        return state;
    }
}
