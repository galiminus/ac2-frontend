export default {
    addToken: (data) => {
        return ({ type: 'TOKEN_ADD', data });
    },

    clearTokens: () => {
        return ({ type: 'TOKENS_CLEAR' });
    }
};
