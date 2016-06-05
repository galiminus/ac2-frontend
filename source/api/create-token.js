import { create } from 'api/http';

export default (record, dispatch) => {
    return new Promise((resolve, reject) => {
        create('/oauth/token', {
            username: record.email,
            password: record.password,
            grant_type: 'password'
        })
        .then(resolve)
        .catch(reject);
    });
};
