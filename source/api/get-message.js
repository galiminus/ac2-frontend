import { find } from 'api/http';

export default (id, query) =>
    find(`/messages/${id}`, query);
