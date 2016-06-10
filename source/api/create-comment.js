import { create } from 'api/http';
import generateUUID from 'utils/uuid';

export default (messageId, attributes) => {
    return new Promise((resolve, reject) => {
        create(`/messages/${messageId}/relationships/comments`, {
            data: {
                type: 'comments',
                id: generateUUID(),
                attributes
            }
        })
        .then(resolve)
        .catch((error) => {
            if (error.response) {
                error.response.json().then(() => {
                    reject({ _error: 'unknown' });
                });
            }
        });
    });
};
