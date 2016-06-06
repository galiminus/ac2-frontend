import { update } from 'api/http';

export default (id, attributes) =>
    new Promise((resolve, reject) =>
        update(`/comments/${id}`, {
            data: {
                type: 'comments',
                attributes
            }
        })
        .then(resolve)
        .catch(reject)
    );
