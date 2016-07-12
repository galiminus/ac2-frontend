import { find } from 'api/http';

export default (id, query) =>
    find(`/pages/${id}`, query);
