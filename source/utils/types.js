export default {
    typeToActions: (type, suffix) => {
        const classes = type.split('::').map((klass) => klass.toUpperCase());

        const actionNames = [];
        for (let i = 0; i < classes.length; i++) {
            actionNames[i] = classes.slice(0, i + 1).join('_') + '_' + suffix;
        }
        return (actionNames);
    },

    extractTypes: (type) => {
        const classes = type.split('::');

        const types = [];
        for (let i = 0; i < classes.length; i++) {
            types[i] = classes.slice(0, i + 1).join('::');
        }

        return (types);
    }
};
