import { find } from 'api/http';

export default (query) =>
    find('/settings/current', query);
