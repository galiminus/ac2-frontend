export default {
    add: (language, translations) => ({ type: 'TRANSLATIONS_ADD', data: { language, translations } })
};
