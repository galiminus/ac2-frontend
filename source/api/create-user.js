import { create } from 'api/http';

export default (attributes, query) => {
    return new Promise((resolve, reject) => {
        create('/users', {
            data: {
                type: 'users',
                attributes
            }
        }, query)
        .then(resolve)
        .catch((error) => {
            if (error.response) {
                error.response.json().then((response) => {
                    if (response.email[0] === 'has already been taken') {
                        reject({ value: 'email_already_in_use' });
                    } else {
                        reject({ value: 'unknown' });
                    }
                });
            }
        });
    });
};
