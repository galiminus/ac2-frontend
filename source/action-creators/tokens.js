export default {
    addToken: (data) => {
        return ({ type: 'TOKEN_ADD', data });
    },

    clearTokens: () => {
        return ({ type: 'TOKEN_CLEAR' });
    }
};
