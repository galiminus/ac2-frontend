import Immutable from 'immutable';

export default function (state = Immutable.Map({}), action) {
    let messages;
    let newState;

    switch (action.type) {
    case 'PAGE_ADD':
        messages = state.get(action.data.id) || Immutable.Map({});
        return state.set(action.data.id, messages);

    case 'PAGE_REMOVE':
        return state.delete(action.data.id);

    case 'MESSAGE_ADD':
        messages = state.get(action.data.sender_id) || Immutable.Map({});
        newState = state.set(action.data.sender_id, messages.set(action.data.id, action.data));

        if (action.data.recipient_id) {
            messages = newState.get(action.data.recipient_id) || Immutable.Map({});
            newState = newState.set(action.data.recipient_id, messages.set(action.data.id, action.data));
        }

        return (newState);

    case 'MESSAGE_REMOVE':
        messages = state.get(action.data.sender_id) || Immutable.Map({});
        newState = state.set(action.data.sender_id, messages.delete(action.data.id));

        if (action.data.recipient_id) {
            messages = newState.get(action.data.recipient_id) || Immutable.Map({});
            newState = newState.set(action.data.recipient_id, messages.delete(action.data.id));
        }

        return (newState);

    default:
        return state;
    }
}
