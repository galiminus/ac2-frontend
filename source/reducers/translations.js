import Immutable from 'immutable';
import Polyglot from 'node-polyglot';

import { frFR } from 'translations';

export default function (state = Immutable.Map({ 'fr-FR': new Polyglot({ phrases: frFR }) }), action) {
    switch (action.type) {
    case 'TRANSLATION_ADD':
        return state.set(action.data.language, new Polyglot({ phrases: action.data.translations }));

    default:
        return state;
    }
}
