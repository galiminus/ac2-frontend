import { update } from 'api/http';

export default (id, attributes) =>
    new Promise((resolve, reject) =>
        update(`/messages/${id}`, {
            data: {
                type: 'messages',
                attributes
            }
        })
        .then(resolve)
        .catch(reject)
    );
