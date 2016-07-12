import { find } from 'api/http';

export default (query) =>
    find('/messages', query);
