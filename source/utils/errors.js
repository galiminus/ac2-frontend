const translateErrors = (errors, translation) => {
    let errorText = '';

    for (const error of errors) {
        errorText += translation.t(`errors.${error.name}`, { argument: error.argument });
    }

    if (errorText.length > 0) {
        return (errorText);
    }
    return (null);
};

export default {
    translateErrors
};
