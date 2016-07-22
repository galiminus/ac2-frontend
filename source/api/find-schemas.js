import { find } from 'api/http';

export default (query) =>
    find('/schemas', query);
