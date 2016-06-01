export default (value) => {
    if (!value) {
        return 'required';
    } else if (value.length < 2) {
        return 'invalid';
    }
};
