import { update } from 'api/http';

export default (id, attributes) =>
    update(`/pages/${id}`, {
        data: {
            type: 'pages',
            attributes
        }
    });
