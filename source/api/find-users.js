import { find } from 'api/http';

export default function (query) {
    return new Promise((resolve, reject) => {
        find('/users', query).then(resolve).catch(reject);
    });
}
