export default {
    addToken: (data) => {
        return ({ type: 'TOKENS_ADD', data });
    },

    clearTokens: () => {
        return ({ type: 'TOKENS_CLEAR' })
    }
};
