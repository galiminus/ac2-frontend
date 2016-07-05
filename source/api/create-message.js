import { create } from 'api/http';
import generateUUID from 'utils/uuid';

export default (attributes) => {
    return new Promise((resolve, reject) => {
        create('/messages', {
            data: {
                type: 'messages',
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