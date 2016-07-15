import { update } from 'api/http';

export default (id, attributes) =>
    update(`/comments/${id}`, {
        data: {
            type: 'comments',
            attributes
        }
    });
