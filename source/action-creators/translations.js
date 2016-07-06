export default {
    addTranslation: (language, translations) => ({ type: 'TRANSLATION_ADD', data: { language, translations } })
};
