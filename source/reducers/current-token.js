export default function (state = null, action) {
    switch (action.type) {
    case "CURRENT_TOKEN_SET":
        return action.accessToken;

    case "TOKENS_CLEAR":
        return null;

    default:
        return state;
    }
}
