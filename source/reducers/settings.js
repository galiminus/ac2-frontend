import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    switch (action.type) {
    case 'SETTINGS_ADD':
        return Immutable.fromJS(action.data);

    default:
        return state;
    }
}
