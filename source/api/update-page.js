import { update } from 'api/http';

export default (id, attributes) =>
    new Promise((resolve, reject) =>
        update(`/pages/${id}`, {
            data: {
                type: 'pages',
                attributes
            }
        })
        .then(resolve)
        .catch(reject)
    );
