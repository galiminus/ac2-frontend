export default (value) => {
    if (!value) {
        return 'required';
    } else if (value.length < 2) {
        return 'invalid';
    } else if (!/^[A-Z0-9._]+$/i.test(value)) {
        return 'invalid';
    }
};
