import { destroy } from 'api/http';

export default (id) => {
    return new Promise((resolve, reject) => {
        destroy(`/likes/${id}`)
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
