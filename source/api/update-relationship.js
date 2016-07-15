import { update } from 'api/http';

export default (id, attributes) =>
    update(`/relationships/${id}`, {
        data: {
            type: 'relationship',
            attributes
        }
    });
