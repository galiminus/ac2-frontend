import { find } from 'api/http';

export default (messageId, query) =>
    find(`/messages/${messageId}/relationships/comments`, query)
