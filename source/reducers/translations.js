import Immutable from 'immutable';
import Polyglot from 'node-polyglot';

export default function (state = Immutable.Map({ 'fr-FR': new Polyglot({ phrases: {} }) }), action) {
    switch (action.type) {
    case 'SETTING_ADD':
        const locales = {};

        const settingsLocale = action.data.data.locales;
        for (const locale in settingsLocale) {
            if ({}.hasOwnProperty.call(settingsLocale, locale)) {
                locales[locale] = new Polyglot({ phrases: settingsLocale[locale] });
            }
        }
        return Immutable.Map(locales);

    default:
        return state;
    }
}
