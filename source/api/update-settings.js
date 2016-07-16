import { update } from 'api/http';

export default (id, attributes) =>
    update(`/settings/${id}`, {
        data: {
            type: 'settings',
            attributes
        }
    });
