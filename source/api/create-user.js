import { create } from 'api/http';

export default (attributes, query) =>
    create('/users', {
        data: {
            type: 'users',
            attributes
        }
    }, query)
